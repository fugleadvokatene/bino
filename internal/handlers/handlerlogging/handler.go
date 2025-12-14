package handlerlogging

import (
	"log/slog"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/request"
)

type LoggingHandler struct {
	handler http.Handler
}

func New(handler http.Handler) http.Handler {
	return &LoggingHandler{
		handler: handler,
	}
}

func (h *LoggingHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	h.handler.ServeHTTP(w, r)
	r.ParseForm()
	items := []any{
		"method", r.Method,
		"path", r.URL.Path,
		"elapsed", time.Since(start),
	}
	for k, v := range r.Form {
		items = append(items, k, v)
	}

	request.LogR(
		r,
		slog.LevelDebug,
		"HTTP request completed",
		items...,
	)
}
