package handlerevent

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
			Path:    "GET /event",
			Handler: &list{DB: db},
			Cap:     model.CapViewAllFormerPatients,
		},
		{
			Path:    "POST /event/{event}/set-note",
			Handler: &setNote{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
	}
}
