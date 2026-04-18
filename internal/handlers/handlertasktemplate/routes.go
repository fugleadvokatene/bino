package handlertasktemplate

import (
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(db *db.Database) []route.Route {
	return []route.Route{
		{
			Path:    "GET /task-templates",
			Handler: &page{DB: db},
			Cap:     model.CapManageSpecies,
		},
		{
			Path:    "POST /task-templates/add",
			Handler: &add{DB: db},
			Cap:     model.CapManageSpecies,
		},
		{
			Path:    "POST /task-template/{template}/edit",
			Handler: &edit{DB: db},
			Cap:     model.CapManageSpecies,
		},
		{
			Path:    "POST /task-template/{template}/delete",
			Handler: &delete_{DB: db},
			Cap:     model.CapManageSpecies,
		},
	}
}
