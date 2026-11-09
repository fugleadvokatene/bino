package handlercheckinfield

import (
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(db *db.Database) []route.Route {
	return []route.Route{
		{
			Path:    "GET /checkin-fields",
			Handler: &page{DB: db},
			Cap:     model.CapManageCheckinFields,
		},
		{
			Path:    "POST /checkin-fields/add",
			Handler: &save{DB: db},
			Cap:     model.CapManageCheckinFields,
		},
		{
			Path:    "POST /checkin-field/{field}/edit",
			Handler: &save{DB: db, edit: true},
			Cap:     model.CapManageCheckinFields,
		},
		{
			Path:    "POST /checkin-field/{field}/delete",
			Handler: &delete_{DB: db},
			Cap:     model.CapManageCheckinFields,
		},
	}
}
