package handlerlive

import (
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
	"github.com/fugleadvokatene/bino/internal/sse"
)

func Routes(
	broker *sse.Broker,
) []route.Route {
	return []route.Route{
		{
			Path:    "GET /live",
			Handler: &stream{broker: broker},
			Cap:     model.CapLive,
		},
	}
}
