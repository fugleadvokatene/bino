package handlerhome

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type DeleteHomeUnavailablePeriod struct {
	DB *db.Database
}

func (h *DeleteHomeUnavailablePeriod) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	periodID, err := request.GetPathID(r, "period")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.DeleteHomeUnavailablePeriod(ctx, periodID); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
