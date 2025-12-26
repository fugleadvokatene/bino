package handlerwiki

import (
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/route"
	"github.com/fugleadvokatene/bino/internal/security"
)

func Routes(
	db *db.Database,
	fileBackend *db.LocalFileStorage,
	secConf *security.Config,
) []route.Route {
	routes := []route.Route{
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
			Path:    "POST /wiki/uploadimage/{id}",
			Handler: &uploadImage{DB: db, FileBackend: fileBackend},
			Cap:     model.CapEditWiki,
		},
	}
	if secConf.AllowUserDefinedHTTPRequests {
		routes = append(routes, route.Route{
			Path:    "POST /wiki/fetchimage/{id}",
			Handler: &fetchImage{DB: db, FileBackend: fileBackend},
			Cap:     model.CapEditWiki,
		})
	}
	return routes
}
