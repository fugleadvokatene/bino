package handlergdriveadmin

import (
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(
	db *db.Database,
	worker *gdrive.Worker,
) []route.Route {
	return []route.Route{
		{
			Path:    "GET /gdrive",
			Handler: &page{Worker: worker, DB: db},
			Cap:     model.CapViewGDriveSettings,
		},
		{
			Path:    "POST /gdrive/indexer",
			Handler: &setIndexerState{Worker: worker, DB: db},
			Cap:     model.CapSetIndexerState,
		},
	}
}
