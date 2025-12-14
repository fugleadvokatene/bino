package handlerlogin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/request"
)

type Login struct {
	org       string
	mascotURL string
}

func New(org, mascotURL string) http.Handler {
	return &Login{
		org:       org,
		mascotURL: mascotURL,
	}
}

func (h *Login) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	_ = LoginPage(commonData, h.org, h.mascotURL).Render(ctx, w)
}
