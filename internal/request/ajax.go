package request

import "net/http"

func AjaxError(w http.ResponseWriter, r *http.Request, err error, statusCode int) {
	LogError(r, err)
	w.WriteHeader(statusCode)
}
