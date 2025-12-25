package handlerpatient

import (
	"github.com/fugleadvokatene/bino/internal/config"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(
	db *db.Database,
	gdriveWorker *gdrive.Worker,
	config *config.Config,
) []route.Route {
	return []route.Route{
		{
			Path:    "GET /patient/{patient}",
			Handler: &page{DB: db},
			Cap:     model.CapViewAllActivePatients,
		},
		{
			Path:    "POST /patient/{patient}/move",
			Handler: &move{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
		{
			Path:    "POST /patient/{patient}/checkout",
			Handler: &checkout{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
		{
			Path:    "POST /patient/{patient}/delete",
			Handler: &delete_{DB: db},
			Cap:     model.CapHardDeletePatient,
		},
		{
			Path:    "POST /patient/{patient}/set-name",
			Handler: &setName{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
		{
			Path:    "POST /patient/{patient}/set-species",
			Handler: &setSpecies{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
		{
			Path:    "POST /patient/{patient}/create-journal",
			Handler: &createJournal{DB: db, GDriveWorker: gdriveWorker, Config: config},
			Cap:     model.CapCreatePatientJournal,
		},
		{
			Path:    "POST /patient/{patient}/attach-journal",
			Handler: &attachJournal{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
		{
			Path:    "POST /patient/{patient}/accept-suggested-journal",
			Handler: &acceptSuggestedJournal{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
		{
			Path:    "POST /patient/{patient}/decline-suggested-journal",
			Handler: &declineSuggestedJournal{DB: db},
			Cap:     model.CapManageOwnPatients,
		},
	}
}
