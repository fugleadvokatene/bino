package handlerschedule

import (
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(db *db.Database) []route.Route {
	return []route.Route{
		{
			Path:    "GET /schedule",
			Handler: &page{DB: db},
			Cap:     model.CapViewAllActivePatients,
		},
		{
			Path:    "POST /schedule/{schedule}/complete",
			Handler: &complete{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
		{
			Path:    "POST /schedule/{schedule}/snooze",
			Handler: &snooze{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
		{
			Path:    "POST /schedule/{schedule}/edit",
			Handler: &edit{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
		{
			Path:    "POST /schedule/{schedule}/delete",
			Handler: &delete_{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
		{
			Path:    "POST /patient/{patient}/schedule",
			Handler: &add{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
		{
			Path:    "POST /patient/{patient}/create-standard-tasks",
			Handler: &createStandard{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
		{
			Path:    "POST /home/{home}/schedule",
			Handler: &addForHome{DB: db},
			Cap:     model.CapManageOwnHomes,
		},
	}
}
