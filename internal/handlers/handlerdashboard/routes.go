package handlerdashboard

import (
	"github.com/fugleadvokatene/bino/internal/config"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(
	db *db.Database,
	worker *gdrive.Worker,
	config *config.Config,
) []route.Route {
	return []route.Route{
		{
			Path:    "POST /checkin",
			Handler: &checkin{DB: db, GDriveWorker: worker, Config: config},
			Cap:     model.CapCheckInPatient,
		},
	}
}
