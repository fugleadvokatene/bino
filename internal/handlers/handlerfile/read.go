package handlerfile

import (
	"errors"
	"io"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5"
)

type Read struct {
	DB *db.Database
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

	// Option to serve smaller versions
	variantStr, err := request.GetQueryValue(r, "variant")
	if err == nil {
		if _, err := model.ParseFileVariantID(variantStr); err == nil {
			if variant, err := h.DB.Q.GetVariant(ctx, sql.GetVariantParams{
				FileID:  file.ID,
				Variant: variantStr,
			}); err == nil {
				h.serveFile(w, r, fileView.UUID, variant.Filename, variant.Mimetype, int(variant.Size))
				return
			}
		}
	}

	// Serve original
	h.serveFile(w, r, fileView.UUID, fileView.OriginalFilename, fileView.MIMEType, int(fileView.Size))
}

func (h *Read) serveFile(w http.ResponseWriter, r *http.Request, uuid string, filename string, mimetype string, size int) {
	ctx := r.Context()
	rc, err := h.DB.OpenFile(ctx, uuid, filename)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusInternalServerError)
		return
	}
	defer rc.Close()
	w.Header().Set("Content-Type", mimetype)
	w.Header().Set("Content-Length", strconv.Itoa(size))
	if _, err := io.Copy(w, rc); err != nil {
		request.LogCtx(ctx, slog.LevelError, "failed to write out file: %v", err)
	}
}
