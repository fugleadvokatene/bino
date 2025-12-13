package handlerhome

import (
	"context"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerjson"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type ReorderRequest struct {
	ID    int32
	Order []int32
}

type AjaxReorderHandler struct {
	DB *db.Database
}

func (h *AjaxReorderHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	handlerjson.Handler(h.DB, w, r, func(db *db.Database, req ReorderRequest) error {
		ctx := r.Context()
		return sortPatients(ctx, h.DB, req)
	})
}

func sortPatients(ctx context.Context, db *db.Database, req ReorderRequest) error {
	ids := []int32{}
	orders := []int32{}
	for idx, id := range req.Order {
		ids = append(ids, id)
		orders = append(orders, int32(idx))
	}
	return db.Q.UpdatePatientSortOrder(ctx, sql.UpdatePatientSortOrderParams{
		Ids:    ids,
		Orders: orders,
	})
}
