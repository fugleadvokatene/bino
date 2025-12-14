package handlerhome

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type setCapacity struct {
	DB *db.Database
}

func (h *setCapacity) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	capacity, err := request.GetFormID(r, "capacity")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.SetHomeCapacity(ctx, sql.SetHomeCapacityParams{
		ID:       id,
		Capacity: capacity,
	}); err != nil {
		commonData.Error(commonData.Language.GenericFailed, err)
	}

	request.RedirectToReferer(w, r)
}
