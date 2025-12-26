package handlerfile

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"strconv"
	"time"

	"github.com/fugleadvokatene/bino/internal/background"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type filepondSubmit struct {
	DB   *db.Database
	Jobs *background.Jobs
}

func (h *filepondSubmit) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	uuids, err := request.GetFormMultiValue(r, "filepond")
	if err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.Redirect(w, r, "/file")
		return
	}

	results := make(map[string]model.FileInfo)
	for _, uuid := range uuids {
		result, err := h.DB.CommitFile(ctx, uuid)
		if err != nil {
			slog.ErrorContext(ctx, "Uploading file", "err", err, "uuid", uuid)
		} else {
			results[uuid] = result
		}
	}
	if err := h.DB.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		errs := []error{}
		for uuid, fileInfo := range results {
			hash, err := h.DB.Sha256File(ctx, h.DB.MainRoot, uuid, fileInfo.FileName)
			if err != nil {
				errs = append(errs, fmt.Errorf("hashing %s: %w", uuid, err))
				data.Error(data.Language.GenericFailed, err)
				continue
			}
			if _, err := h.DB.Q.PublishFile(ctx, sql.PublishFileParams{
				Uuid:          uuid,
				Creator:       data.User.AppuserID,
				Created:       pgtype.Timestamptz{Time: time.Now(), Valid: true},
				Accessibility: int32(model.FileAccessibilityInternal),
				Filename:      fileInfo.FileName,
				Mimetype:      fileInfo.MIMEType,
				Size:          fileInfo.Size,
				Sha256:        hash,
			}); err != nil {
				errs = append(errs, fmt.Errorf("committing %s: %w", uuid, err))
				data.Error(data.Language.GenericFailed, err)
			}
		}
		return errors.Join(errs...)
	}); err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.Redirect(w, r, "/file")
		return
	}

	// Wake up the job that generates miniatures
	h.Jobs.ImageHint.Send()

	request.Redirect(w, r, "/file")
}

type filepondProcess struct {
	DB *db.Database
}

// https://pqina.nl/filepond/docs/api/server/#process
func (h *filepondProcess) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	// Parse multipart form with reasonable max memory
	err := r.ParseMultipartForm(db.MaxImageSize)
	if err != nil {
		data.Log(slog.LevelWarn, "file too large?", "err", err, "maxsize", db.MaxImageSize)
		request.AjaxError(w, r, err, http.StatusRequestEntityTooLarge)
		return
	}

	file, header, err := r.FormFile("filepond")
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}
	defer file.Close()

	uuid, err := h.DB.UploadFile(ctx, file, model.FileInfo{
		FileName: header.Filename,
		MIMEType: header.Header.Get("Content-Type"),
		Size:     header.Size,
		Creator:  data.User.AppuserID,
		Created:  time.Now(),
	})
	if err != nil {
		request.AjaxError(w, r, err, db.GetHTTPStatusCode(err))
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(uuid))
}

type filepondRevert struct {
	DB *db.Database
}

// https://pqina.nl/filepond/docs/api/server/#revert
func (h *filepondRevert) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	in, err := io.ReadAll(r.Body)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}

	if err := h.DB.DeleteTempFile(ctx, string(in)); err != nil {
		request.AjaxError(w, r, err, db.GetHTTPStatusCode(err))
		return
	}

	w.Header().Set("Content-Type", "text/plain")
}

type filepondRestore struct {
	DB *db.Database
}

// https://pqina.nl/filepond/docs/api/server/#restore
func (h *filepondRestore) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathValue(r, "id")
	if err != nil {
		request.AjaxError(w, r, err, http.StatusInternalServerError)
	}

	data, meta, err := h.DB.ReadTempFile(ctx, id)
	if err != nil {
		request.AjaxError(w, r, err, db.GetHTTPStatusCode(err))
		return
	}
	if err != nil {
		request.AjaxError(w, r, err, db.GetHTTPStatusCode(err))
		return
	}

	w.Header().Set("Content-Type", meta.MIMEType)
	w.Header().Set("Content-Length", strconv.Itoa(len(data)))
	w.Write(data)
}
