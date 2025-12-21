package handlerlive

import (
	"github.com/fugleadvokatene/bino/internal/live"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(
	broker *live.Broker,
) []route.Route {
	return []route.Route{
		{
			Path:    "GET /live",
			Handler: &stream{broker: broker},
			Cap:     model.CapLive,
		},
	}
}
