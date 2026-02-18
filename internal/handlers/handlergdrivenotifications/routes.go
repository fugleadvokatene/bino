package handlergdrivenotifications

import (
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(
	db *db.Database,
	worker *gdrive.Worker,
) []route.Route {
	endpoint := &endpoint{Worker: worker, DB: db}
	return []route.Route{
		{
			Path:             "GET /gdrivenotifications",
			Handler:          endpoint,
			LoggedOutHandler: endpoint,
		},
	}
}
