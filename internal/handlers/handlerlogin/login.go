package handlerlogin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/request"
)

type Login struct {
}

func (h *Login) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	_ = LoginPage(commonData).Render(ctx, w)
}
