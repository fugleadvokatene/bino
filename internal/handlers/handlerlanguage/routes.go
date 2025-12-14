package handlerlanguage

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
			Path:    "POST /language",
			Handler: &post{DB: db},
			Cap:     model.CapSetOwnPreferences,
		},
	}
}
