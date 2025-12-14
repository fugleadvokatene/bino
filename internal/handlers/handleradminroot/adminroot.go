package handleradminroot

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/request"
)

type handler struct {
}

func (h *handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	_ = AdminRootPage(commonData).Render(ctx, w)
}
