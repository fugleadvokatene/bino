package handlerevent

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type setNote struct {
	DB *db.Database
}

func (h *setNote) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	event, err := request.GetPathID(r, "event")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	note, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.SetEventNote(ctx, event, note); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
