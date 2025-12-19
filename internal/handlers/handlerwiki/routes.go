package handlerwiki

import (
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
)

func Routes(
	db *db.Database,
	fileBackend *fs.LocalFileStorage,
) []route.Route {
	return []route.Route{
		{
			Path:    "GET /wiki",
			Handler: &main{DB: db},
			Cap:     model.CapEditWiki,
		},
		{
			Path:    "GET /wiki/view/{id}",
			Handler: &page{DB: db},
			Cap:     model.CapEditWiki,
		},
		{
			Path:    "POST /wiki/create",
			Handler: &create{DB: db},
			Cap:     model.CapEditWiki,
		},
		{
			Path:    "POST /wiki/title/{id}",
			Handler: &setTitle{DB: db},
			Cap:     model.CapEditWiki,
		},
		{
			Path:    "POST /wiki/save/{id}",
			Handler: &save{DB: db},
			Cap:     model.CapEditWiki,
		},
		{
			Path:    "POST /wiki/fetchimage/{id}",
			Handler: &fetchImage{DB: db, FileBackend: fileBackend},
			Cap:     model.CapEditWiki,
		},
		{
			Path:    "POST /wiki/uploadimage/{id}",
			Handler: &uploadImage{DB: db, FileBackend: fileBackend},
			Cap:     model.CapEditWiki,
		},
	}
}
