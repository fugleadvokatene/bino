package request

import (
	"net/http"
)

func Redirect(w http.ResponseWriter, r *http.Request, url string) {
	if cd, err := LoadCommonData(r.Context()); err == nil {
		cd.SaveFeedback()
	}

	http.Redirect(w, r, url, http.StatusFound)
}

func RedirectToReferer(w http.ResponseWriter, r *http.Request) {
	Redirect(w, r, r.Header.Get("Referer"))
}

func LastGoodURL(r *http.Request) string {
	// TODO: not this. Store last good URL in the cookie or something
	return r.Referer()
}
