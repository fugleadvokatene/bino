package handleraccess

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/request"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	commonData.Subtitle = commonData.Language.AccessLevel
	_ = AccessLevelPage(commonData).Render(ctx, w)
}
