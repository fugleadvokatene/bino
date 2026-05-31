package handlerclienterror

import (
	"io"
	"log/slog"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes() []route.Route {
	return []route.Route{
		{
			Path:    "POST /ajax/client-error",
			Handler: http.HandlerFunc(handle),
		},
	}
}

func handle(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(io.LimitReader(r.Body, 1024))
	if err != nil {
		return
	}
	request.LogR(r, slog.LevelWarn, "client JS error", "message", string(body))
}
