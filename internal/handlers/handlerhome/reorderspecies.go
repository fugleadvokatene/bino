package handlerhome

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerjson"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type reorderSpecies struct {
	DB *db.Database
}

func (h *reorderSpecies) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	handlerjson.Handler(h.DB, w, r, func(db *db.Database, req ReorderRequest) error {
		if req.ID != id {
			return fmt.Errorf("mismatched ID between request data and URL (URL=%d, req=%d)", id, req.ID)
		}
		ids := []int32{}
		orders := []int32{}
		for idx, id := range req.Order {
			ids = append(ids, id)
			orders = append(orders, int32(idx))
		}
		return db.Q.UpdatePreferredSpeciesSortOrder(ctx, sql.UpdatePreferredSpeciesSortOrderParams{
			HomeID:    id,
			SpeciesID: ids,
			Orders:    orders,
		})
	})
}
