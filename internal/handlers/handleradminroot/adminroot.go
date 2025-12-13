package handleradminroot

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/request"
)

type Handler struct {
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	_ = AdminRootPage(commonData).Render(ctx, w)
}
