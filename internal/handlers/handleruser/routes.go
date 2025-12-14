package handleruser

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
			Path:    "GET /user/{user}",
			Handler: &getUser{DB: db},
			Cap:     model.CapViewAllHomes,
		},
	}
}
