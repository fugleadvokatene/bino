package handlersearch

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/request"
)

type page struct {
	DB *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	commonData.Subtitle = commonData.Language.GenericSearch

	result, err := doSearch(r, h.DB)
	if err != nil {
		emptySearch(w, r, result, err.Error(), true)
		return
	}
	_ = SearchPage(commonData, result, commonData.Language.GenericNotFound).Render(ctx, w)
}
