package handlerhome

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type setNote struct {
	DB *db.Database
}

func (h *setNote) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	homeID, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	note, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.SetHomeNote(ctx, sql.SetHomeNoteParams{
		ID:   homeID,
		Note: note,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
