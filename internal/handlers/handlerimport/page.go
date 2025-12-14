package handlerimport

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/request"
)

type page struct {
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	commonData.Subtitle = commonData.Language.ImportHeader

	var ir ImportRequest
	commonData.Cookies.Get("import-request", "json", &ir)

	_ = ImportPage(commonData, ir).Render(ctx, w)
}
