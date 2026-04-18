package handlerschedule

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type snooze struct {
	DB *db.Database
}

func (h *snooze) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if err := request.ValidateCSRF(r); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	id, err := request.GetPathID(r, "schedule")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.SnoozeSchedule(ctx, id); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
