package handlerhome

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
			Path:    "GET /home/{home}",
			Handler: &page{DB: db},
			Cap:     model.CapViewAllHomes,
		},
		{
			Path:    "POST /home/{home}/set-capacity",
			Handler: &setCapacity{DB: db},
			Cap:     model.CapManageOwnHomes,
		},
		{
			Path:    "POST /home/{home}/add-unavailable",
			Handler: &addHomeUnavailablePeriod{DB: db},
			Cap:     model.CapManageOwnHomes,
		},
		{
			Path:    "POST /home/{home}/set-note",
			Handler: &setNote{DB: db},
			Cap:     model.CapManageOwnHomes,
		},
		{
			Path:    "POST /home/{home}/species/add",
			Handler: &addPreferredSpecies{DB: db},
			Cap:     model.CapManageOwnHomes,
		},
		{
			Path:    "POST /home/{home}/species/delete/{species}",
			Handler: &deletePreferredSpecies{DB: db},
			Cap:     model.CapManageOwnHomes,
		},
		{
			Path:    "POST /home/{home}/species/reorder",
			Handler: &reorderSpecies{DB: db},
			Cap:     model.CapManageOwnHomes,
		},
		{
			Path:    "POST /period/{period}/delete",
			Handler: &deleteHomeUnavailablePeriod{DB: db},
			Cap:     model.CapManageOwnHomes,
		},
		{
			Path:    "POST /ajaxreorder",
			Handler: &ajaxReorderHandler{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
	}
}
