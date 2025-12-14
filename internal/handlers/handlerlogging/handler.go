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
	r.ParseForm()
	items := []any{
		"method", r.Method,
		"path", r.URL.Path,
	}
	for k, v := range r.Form {
		items = append(items, k, v)
	}

	request.LogR(
		r,
		slog.LevelDebug,
		"HTTP request started",
		items...,
	)
	h.handler.ServeHTTP(w, r)
	items = append(items, "elapsed", time.Since(start))
	request.LogR(
		r,
		slog.LevelDebug,
		"HTTP request completed",
		items...,
	)
}
