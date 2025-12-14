package handlerdebug

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/debug"
	"github.com/fugleadvokatene/bino/internal/request"
)

type page struct {
	ConstantInfo debug.ConstantInfo
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	_ = DebugPage(data, debug.GetDebugInfo(ctx, h.ConstantInfo)).Render(ctx, w)
}
