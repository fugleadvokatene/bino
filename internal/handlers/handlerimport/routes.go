package handlerimport

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
			Path:    "GET /import",
			Handler: &page{},
			Cap:     model.CapUseImportTool,
		},
		{
			Path:    "POST /import",
			Handler: &post{},
			Cap:     model.CapUseImportTool,
		},
		{
			Path:    "GET /import/validation",
			Handler: &validate{DB: db},
			Cap:     model.CapUseImportTool,
		},
	}
}
