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

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type filepondSubmit struct {
	DB          *db.Database
	FileBackend fs.FileStorage
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

	result := h.FileBackend.Commit(ctx, uuids)
	if result.Error != nil {
		data.Error(data.Language.GenericFailed, result.Error)
		request.Redirect(w, r, "/file")
		return
	}

	if err := h.DB.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		errs := []error{}
		for uuid, fileInfo := range result.Commited {
			_, err := h.DB.Q.PublishFile(ctx, sql.PublishFileParams{
				Uuid:          uuid,
				Creator:       data.User.AppuserID,
				Created:       pgtype.Timestamptz{Time: time.Now(), Valid: true},
				Accessibility: int32(model.FileAccessibilityInternal),
				Filename:      fileInfo.FileName,
				Mimetype:      fileInfo.MIMEType,
				Size:          fileInfo.Size,
			})
			if err != nil {
				errs = append(errs, fmt.Errorf("committing %s: %w", uuid, err))
				data.Error(data.Language.GenericFailed, err)
			}
		}
		return errors.Join(errs...)
	}); err != nil {
		data.Error(data.Language.GenericFailed, result.Error)
		request.Redirect(w, r, "/file")
		return
	}

	request.Redirect(w, r, "/file")
}

type filepondProcess struct {
	FileBackend fs.FileStorage
}

// https://pqina.nl/filepond/docs/api/server/#process
func (h *filepondProcess) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	// Parse multipart form with reasonable max memory
	err := r.ParseMultipartForm(fs.MaxImageSize)
	if err != nil {
		data.Log(slog.LevelWarn, "file too large?", "err", err, "maxsize", fs.MaxImageSize)
		request.AjaxError(w, r, err, http.StatusRequestEntityTooLarge)
		return
	}

	file, header, err := r.FormFile("filepond")
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}
	defer file.Close()

	result := h.FileBackend.Upload(ctx, file, model.FileInfo{
		FileName: header.Filename,
		MIMEType: header.Header.Get("Content-Type"),
		Size:     header.Size,
		Creator:  data.User.AppuserID,
		Created:  time.Now(),
	})
	if result.Error != nil {
		request.AjaxError(w, r, err, result.HTTPStatusCode)
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(result.UniqueID))
}

type filepondRevert struct {
	FileBackend fs.FileStorage
}

// https://pqina.nl/filepond/docs/api/server/#revert
func (h *filepondRevert) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	in, err := io.ReadAll(r.Body)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}

	if result := h.FileBackend.DeleteTemp(ctx, string(in)); result.Error != nil {
		request.AjaxError(w, r, err, result.HTTPStatusCode)
		return
	}

	w.Header().Set("Content-Type", "text/plain")
}

type filepondRestore struct {
	FileBackend fs.FileStorage
}

// https://pqina.nl/filepond/docs/api/server/#restore
func (h *filepondRestore) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathValue(r, "id")
	if err != nil {
		request.AjaxError(w, r, err, http.StatusInternalServerError)
	}

	res := h.FileBackend.ReadTemp(ctx, id)
	if res.Error != nil {
		request.AjaxError(w, r, res.Error, res.HTTPStatusCode)
		return
	}
	if res.Error != nil {
		request.AjaxError(w, r, res.Error, res.HTTPStatusCode)
		return
	}

	w.Header().Set("Content-Type", res.FileInfo.MIMEType)
	w.Header().Set("Content-Length", strconv.Itoa(len(res.Data)))
	w.Write(res.Data)
}
