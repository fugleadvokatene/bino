package handlerfile

import (
	"io"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/fugleadvokatene/bino/internal/background"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/request"
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

	for _, uuid := range uuids {
		_, _, err := h.DB.CommitFile(ctx, uuid)
		if err != nil {
			slog.ErrorContext(ctx, "Committing file", "err", err, "uuid", uuid)
		}
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

	uuid, err := h.DB.UploadFile(ctx, file, header.Filename, header.Header.Get("Content-Type"), header.Size)
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
