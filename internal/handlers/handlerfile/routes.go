package handlerfile

import (
	"github.com/fugleadvokatene/bino/internal/background"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(
	db *db.Database,
	fileBackend *db.LocalFileStorage,
	jobs *background.Jobs,
) []route.Route {
	readHandler := &Read{DB: db, FileBackend: fileBackend}
	return []route.Route{
		{
			Path:             "GET /file/{id}/{filename}",
			Handler:          readHandler,
			Cap:              model.CapLoggedIn,
			LoggedOutHandler: readHandler,
		},
		{
			Path:    "GET /file",
			Handler: &uploadPage{DB: db},
			Cap:     model.CapUploadFile,
		},
		{
			Path:    "POST /file/filepond",
			Handler: &filepondProcess{FileBackend: fileBackend},
			Cap:     model.CapUploadFile,
		},
		{
			Path:    "DELETE /file/filepond",
			Handler: &filepondRevert{FileBackend: fileBackend},
			Cap:     model.CapUploadFile,
		},
		{
			Path:    "GET /file/filepond/{id}",
			Handler: &filepondRestore{FileBackend: fileBackend},
			Cap:     model.CapUploadFile,
		},
		{
			Path:    "POST /file/submit",
			Handler: &filepondSubmit{DB: db, FileBackend: fileBackend, Jobs: jobs},
			Cap:     model.CapUploadFile,
		},
		{
			Path:    "POST /file/{id}/delete",
			Handler: &delete_{DB: db, FileBackend: fileBackend},
			Cap:     model.CapUploadFile,
		},
		{
			Path:    "POST /file/{id}/set-filename",
			Handler: &setFilename{DB: db},
			Cap:     model.CapEditWiki,
		},
	}
}
