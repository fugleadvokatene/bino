package auth

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"net/http"
	"os"

	"golang.org/x/oauth2"
)

type LoginRedirectHandler struct {
	auth *Authenticator
}

func NewLoginRedirectHandler(
	auth *Authenticator,
) http.Handler {
	return &LoginRedirectHandler{
		auth: auth,
	}
}

func randState() string {
	b := make([]byte, 32)
	_, _ = rand.Read(b)
	return base64.RawURLEncoding.EncodeToString(b)
}

func (h *LoginRedirectHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	state := randState()
	session, _ := h.auth.cookies.Backend.Get(r, "auth")
	session.Values["state"] = state
	if err := session.Save(r, w); err != nil {
		fmt.Fprintf(os.Stderr, "saving cookie: %v", err)
	}
	http.Redirect(
		w,
		r,
		h.auth.oauthConfig.AuthCodeURL(
			state,
			oauth2.AccessTypeOffline,
			oauth2.SetAuthURLParam("prompt", "consent"),
		),
		http.StatusFound,
	)
}
