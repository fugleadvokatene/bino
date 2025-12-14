package handlersearch

import (
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(
	db *db.Database,
) []route.Route {
	return []route.Route{
		{
			Path:    "GET /search",
			Handler: &page{DB: db},
			Cap:     model.CapSearch,
		},
		{
			Path:    "GET /search/live",
			Handler: &live{DB: db},
			Cap:     model.CapSearch,
		},
	}
}
