package handlerspeciesadmin

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
			Path:    "GET /species",
			Handler: &getSpecies{DB: db},
			Cap:     model.CapManageSpecies,
		},
		{
			Path:    "POST /species",
			Handler: &postSpecies{DB: db},
			Cap:     model.CapManageSpecies,
		},
		{
			Path:    "PUT /species",
			Handler: &putSpecies{DB: db},
			Cap:     model.CapManageSpecies,
		},
	}
}
