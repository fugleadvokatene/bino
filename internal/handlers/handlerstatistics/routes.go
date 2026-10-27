package handlerstatistics

import (
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(
	db *db.Database,
	location *time.Location,
) []route.Route {
	return []route.Route{
		{
			Path:    "GET /statistics",
			Handler: &page{DB: db, Location: location},
			Cap:     model.CapViewStatistics,
		},
	}
}
