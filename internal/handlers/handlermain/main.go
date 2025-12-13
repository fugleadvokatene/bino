package handlermain

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/handlers/handlerdashboard"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerlogin"
	"github.com/fugleadvokatene/bino/internal/request"
)

type Handler struct {
	Dashboard *handlerdashboard.Page
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	if commonData.User != nil {
		h.Dashboard.ServeHTTP(w, r)
	} else {
		handlerlogin.ServeHTTP(w, r)
	}
}
