package handlerfile

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type setFilename struct {
	DB *db.Database
}

func (h *setFilename) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathID(r, "id")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	value, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.UpdatePresentationFilename(ctx, sql.UpdatePresentationFilenameParams{
		Filename: value,
		ID:       id,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
