package handlerfile

import (
	"errors"
	"io"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/jackc/pgx/v5"
)

type Read struct {
	DB          *db.Database
	FileBackend *fs.LocalFileStorage
}

func (h *Read) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathID(r, "id")
	if err != nil {
		request.AjaxError(w, r, err, http.StatusNotFound)
		return
	}

	file, err := h.DB.Q.GetFileByID(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			request.AjaxError(w, r, err, http.StatusNotFound)
		} else {
			request.AjaxError(w, r, err, http.StatusInternalServerError)
		}
		return
	}

	fileView := file.ToModel()

	switch fileView.Accessibility {
	case model.FileAccessibilityPublic:
	case model.FileAccessibilityInternal:
		cd, err := request.LoadCommonData(ctx)
		if err != nil || cd == nil || cd.User == nil {
			request.AjaxError(w, r, err, http.StatusUnauthorized)
			return
		}
	case model.FileAccessibilityPersonal:
		cd, err := request.LoadCommonData(ctx)
		if err != nil || cd.User.AppuserID != fileView.Creator {
			request.AjaxError(w, r, err, http.StatusUnauthorized)
			return
		}
	}

	rc, err := h.FileBackend.Open(ctx, fileView.UUID, fileView.FileInfo())
	if err != nil {
		request.AjaxError(w, r, err, http.StatusInternalServerError)
		return
	}
	defer rc.Close()
	w.Header().Set("Content-Type", fileView.MIMEType)
	w.Header().Set("Content-Length", strconv.Itoa(int(fileView.Size)))
	if _, err := io.Copy(w, rc); err != nil {
		request.LogCtx(ctx, slog.LevelError, "failed to write out file: %v", err)
	}
}
