package handlerfeatureflag

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type delete_ struct {
	db *db.Database
}

func (h *delete_) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	flag, err := request.GetPathValue(r, "flag")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	if err := h.db.DeleteFeatureFlag(ctx, flag); err != nil {
		handlererror.Error(w, r, err)
	}
	request.RedirectToReferer(w, r)
}
