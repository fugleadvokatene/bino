package handlerhomeadmin

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
			Path:    "GET /homes",
			Handler: &page{DB: db},
			Cap:     model.CapManageAllHomes,
		},
		{
			Path:    "POST /homes",
			Handler: &form{DB: db},
			Cap:     model.CapManageAllHomes,
		},
		{
			Path:    "POST /homes/{home}/set-name",
			Handler: &form{DB: db},
			Cap:     model.CapManageOwnHomes,
		},
	}
}
