package handlersearch

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/request"
)

type live struct {
	DB *db.Database
}

func (h *live) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	// Ignore CSRF in this instance (ajax form, arguably harmless)
	commonData.User.CSRFCheckPassed = true

	result, err := doSearch(r, h.DB)
	if err != nil {
		emptySearch(w, r, result, err.Error(), false)
		return
	}
	_ = SearchMatches(commonData, result, commonData.Language.GenericNotFound).Render(ctx, w)
}
