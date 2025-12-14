package handlerfile

import (
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(
	db *db.Database,
	fileBackend fs.FileStorage,
) []route.Route {
	return []route.Route{
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
			Handler: &filepondSubmit{DB: db, FileBackend: fileBackend},
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
