package handleradminroot

import (
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes() []route.Route {
	return []route.Route{
		{
			Path:    "GET /admin",
			Handler: &handler{},
			Cap:     model.CapViewAdminTools,
		},
	}
}
