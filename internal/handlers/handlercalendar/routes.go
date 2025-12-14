package handlercalendar

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
			Path:    "GET /calendar",
			Handler: &page{},
			Cap:     model.CapViewCalendar,
		},
		{
			Path:    "GET /calendar/away",
			Handler: &ajaxAway{DB: db},
			Cap:     model.CapViewCalendar,
		},
		{
			Path:    "GET /calendar/patientevents",
			Handler: &ajaxPatientEvents{DB: db},
			Cap:     model.CapViewCalendar,
		},
	}
}
