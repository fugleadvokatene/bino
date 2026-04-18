package handlertasktemplate

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type delete_ struct {
	DB *db.Database
}

func (h *delete_) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if err := request.ValidateCSRF(r); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	id, err := request.GetPathID(r, "template")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.DeleteScheduleTemplate(ctx, id); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
