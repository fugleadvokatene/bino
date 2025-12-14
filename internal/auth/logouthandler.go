package auth

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/cookies"
)

type logOutHandler struct {
	cookies *cookies.CookieStore
}

func NewLogOutHandler(cookies *cookies.CookieStore) http.Handler {
	return &logOutHandler{
		cookies: cookies,
	}
}

func (h *logOutHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	sess, err := h.cookies.Backend.Get(r, "auth")
	if err == nil {
		sess.Options.MaxAge = -1
		_ = sess.Save(r, w)
	}
	http.Redirect(w, r, "/", http.StatusFound)
}
