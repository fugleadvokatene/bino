package handlerdebug

import (
	"github.com/fugleadvokatene/bino/internal/debug"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes() []route.Route {
	return []route.Route{
		{
			Path:    "GET /debug",
			Handler: &page{ConstantInfo: debug.NewRuntimeInfo()},
			Cap:     model.CapDebug,
		},
	}
}
