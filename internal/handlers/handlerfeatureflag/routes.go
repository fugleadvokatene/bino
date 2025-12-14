package handlerfeatureflag

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
			Path:    "GET /ff",
			Handler: &page{db: db},
			Cap:     model.CapManageFeatureFlags,
		},
		{
			Path:    "POST /ff/{flag}/{user}/set",
			Handler: &set{db: db},
			Cap:     model.CapManageFeatureFlags,
		},
		{
			Path:    "POST /ff/{flag}/{user}/clear",
			Handler: &clear{db: db},
			Cap:     model.CapManageFeatureFlags,
		},
		{
			Path:    "POST /ff/create",
			Handler: &create{db: db},
			Cap:     model.CapManageFeatureFlags,
		},
		{
			Path:    "POST /ff/{flag}/delete",
			Handler: &delete_{db: db},
			Cap:     model.CapManageFeatureFlags,
		},
	}
}
