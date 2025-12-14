package auth

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/request"
)

type withLoginRequired struct {
	handler      http.Handler
	auth         *Authenticator
	loginHandler http.Handler
	buildKey     string
}

func NewLoginRequiredHandler(
	handler http.Handler,
	auth *Authenticator,
	buildKey string,
) http.Handler {
	return &withLoginRequired{
		handler:      handler,
		auth:         auth,
		buildKey:     buildKey,
		loginHandler: NewLoginRedirectHandler(auth),
	}
}

func (h *withLoginRequired) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	commonData, err := Authenticate(
		w,
		r,
		h.auth,
		h.loginHandler,
		h.buildKey,
	)
	if err != nil {
		fmt.Println(err)
		return
	}

	ctx := r.Context()
	ctx = request.WithCommonData(ctx, &commonData, h.auth.cookies, w, r)
	r = r.WithContext(ctx)

	h.handler.ServeHTTP(w, r)
}
