package auth

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/request"
)

type withLoginOptional struct {
	loggedInHandler  *withLoginRequired
	loggedOutHandler http.Handler
}

func NewLoginOptionalHandler(
	handler http.Handler,
	auth *Authenticator,
	loggedOutHandler http.Handler,
	buildKey string,
) http.Handler {
	return &withLoginOptional{
		loggedInHandler: &withLoginRequired{
			handler:      handler,
			auth:         auth,
			loginHandler: loggedOutHandler,
			buildKey:     buildKey,
		},
		loggedOutHandler: loggedOutHandler,
	}
}

func (h *withLoginOptional) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	_, _, err := GetUser(w, r, h.loggedInHandler.auth)
	if err == nil {
		h.loggedInHandler.ServeHTTP(w, r)
		return
	}

	ctx := r.Context()
	ctx = request.WithCommonData(ctx, &request.CommonData{
		BuildKey: h.loggedInHandler.buildKey,
		Language: language.EN,
	}, h.loggedInHandler.auth.cookies, w, r)
	r = r.WithContext(ctx)

	if h.loggedOutHandler == nil {
		h.loggedInHandler.handler.ServeHTTP(w, r)
	} else {
		h.loggedOutHandler.ServeHTTP(w, r)
	}
}
