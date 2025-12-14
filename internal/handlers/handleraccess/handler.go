package handleraccess

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/capabilities"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
)

type withAccessLevelRequired struct {
	accessLevel model.AccessLevel
	handler     http.Handler
}

func New(handler http.Handler, cap model.Cap) http.Handler {
	al, ok := capabilities.RequiredAccessLevel[cap]
	if !ok {
		panic(fmt.Errorf("no access level for %s", cap.String()))
	}
	return newWithAccessLevel(handler, al)
}

func (h *withAccessLevelRequired) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	if data.User.AccessLevel < h.accessLevel {
		Unauthorized(w, r, errors.New(data.Language.AccessLevelBlocked(h.accessLevel)))
		return
	}
	h.handler.ServeHTTP(w, r)
}

func newWithAccessLevel(handler http.Handler, al model.AccessLevel) http.Handler {
	return &withAccessLevelRequired{
		accessLevel: al,
		handler:     handler,
	}
}
