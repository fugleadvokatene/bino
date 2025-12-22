package handlerdashboard

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/config"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
	"github.com/fugleadvokatene/bino/internal/sse"
)

func Routes(
	backgroundCtx context.Context,
	db *db.Database,
	worker *gdrive.Worker,
	broker *sse.Broker,
	config *config.Config,
) []route.Route {
	return []route.Route{
		{
			Path: "POST /checkin",
			Handler: &checkin{
				BackgroundCtx: backgroundCtx,
				DB:            db,
				GDriveWorker:  worker,
				Config:        config,
				Broker:        broker,
			},
			Cap: model.CapCheckInPatient,
		},
	}
}
