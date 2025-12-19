package handlerimport

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/request"
)

type page struct {
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	commonData.Subtitle = commonData.Language.ImportHeader

	var ir ImportRequest
	if found, err := commonData.Cookies.Get("import-request", "json", &ir); err != nil || !found {
		generic.Clear(&ir)
	}

	_ = ImportPage(commonData, ir).Render(ctx, w)
}
