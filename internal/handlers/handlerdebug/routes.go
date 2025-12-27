package handlerdebug

import (
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/debug"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(db *db.Database) []route.Route {
	return []route.Route{
		{
			Path:    "GET /debug",
			Handler: &page{ConstantInfo: debug.NewRuntimeInfo(), DB: db},
			Cap:     model.CapDebug,
		},
	}
}
