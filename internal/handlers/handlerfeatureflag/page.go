package handlerfeatureflag

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type page struct {
	db *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	ff, err := h.db.FeatureFlags(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	Page(data, ff).Render(ctx, w)
}
