package handlerhomeadmin

import (
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(
	db *db.Database,
	gdriveWorker *gdrive.Worker,
) []route.Route {
	return []route.Route{
		{
			Path:    "GET /homes",
			Handler: &page{DB: db},
			Cap:     model.CapManageAllHomes,
		},
		{
			Path:    "POST /homes",
			Handler: &form{DB: db},
			Cap:     model.CapManageAllHomes,
		},
		{
			Path:    "POST /home/{home}/set-name",
			Handler: &setName{DB: db},
			Cap:     model.CapManageOwnHomes,
		},
		{
			Path:    "POST /homes/divisions/{division}/set-name",
			Handler: &setDivisionName{DB: db},
			Cap:     model.CapManageAllHomes,
		},
		{
			Path:    "POST /homes/divisions/{division}/set-journal-folder",
			Handler: &setDivisionJournalFolder{DB: db, G: gdriveWorker},
			Cap:     model.CapManageAllHomes,
		},
		{
			Path:    "POST /homes/divisions/{division}/set-template-journal",
			Handler: &setDivisionTemplateJournal{DB: db, G: gdriveWorker},
			Cap:     model.CapManageAllHomes,
		},
	}
}
