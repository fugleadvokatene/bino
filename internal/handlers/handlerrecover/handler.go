package handlerrecover

import (
	"fmt"
	"net/http"
	"runtime/debug"
)

type withRecover struct {
	handler http.Handler
}

func (h *withRecover) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	defer func() {
		if rec := recover(); rec != nil {
			msg := fmt.Sprintf("runtime panic: %s\ntraceback: %s", rec, string(debug.Stack()))
			http.Error(w, msg, http.StatusInternalServerError)
			fmt.Println(msg)
		}
	}()
	h.handler.ServeHTTP(w, r)
}

func New(handler http.Handler) http.Handler {
	return &withRecover{
		handler: handler,
	}
}
