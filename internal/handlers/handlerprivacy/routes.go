package handlerprivacy

import (
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/privacy"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(
	db *db.Database,
	config privacy.Config,
) []route.Route {
	return []route.Route{
		{
			Path:             "GET /privacy",
			Handler:          &Page{Config: config},
			LoggedOutHandler: &Page{Config: config},
		},
		{
			Path:    "POST /privacy",
			Handler: &form{DB: db, Config: config},
			Cap:     model.CapSetOwnPreferences,
		},
	}
}
