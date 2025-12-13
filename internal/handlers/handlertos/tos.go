package handlertos

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/request"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	commonData.Subtitle = commonData.Language.FooterTOS
	_ = TOS(commonData).Render(ctx, w)
}
