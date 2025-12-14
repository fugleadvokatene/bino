package handlertos

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes() []route.Route {
	return []route.Route{
		{
			Path:    "GET /tos",
			Handler: http.HandlerFunc(Handler),
		},
	}
}
