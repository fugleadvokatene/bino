package request

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/cookies"
)

type UserCookies struct {
	Store *cookies.CookieStore
	W     http.ResponseWriter
	R     *http.Request
}

func (uc *UserCookies) Set(key, subkey string, value any) error {
	return uc.Store.Set(uc.W, uc.R, key, subkey, value)
}

func (uc *UserCookies) Get(key, subkey string, value any) (bool, error) {
	return uc.Store.Get(uc.R, key, subkey, value)
}
