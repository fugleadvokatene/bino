package handlerfeatureflag

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type create struct {
	db *db.Database
}

func (h *create) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	flag, err := request.GetFormValue(r, "flag")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	if err := h.db.CreateFeatureFlag(ctx, flag); err != nil {
		handlererror.Error(w, r, err)
	}
	request.RedirectToReferer(w, r)
}
