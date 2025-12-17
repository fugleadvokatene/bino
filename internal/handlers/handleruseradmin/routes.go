package handleruseradmin

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
			Path:    "GET /users",
			Handler: &page{DB: db},
			Cap:     model.CapManageUsers,
		},
		{
			Path:    "GET /user/{user}/confirm-scrub",
			Handler: &confirmScrubOrNuke{DB: db, Nuke: false},
			Cap:     model.CapDeleteUsers,
		},
		{
			Path:    "GET /user/{user}/confirm-nuke",
			Handler: &confirmScrubOrNuke{DB: db, Nuke: true},
			Cap:     model.CapDeleteUsers,
		},
		{
			Path:    "POST /user/{user}/scrub",
			Handler: &doScrubOrNuke{DB: db, Nuke: false},
			Cap:     model.CapDeleteUsers,
		},
		{
			Path:    "POST /user/{user}/nuke",
			Handler: &doScrubOrNuke{DB: db, Nuke: true},
			Cap:     model.CapDeleteUsers,
		},
		{
			// Invite-form
			Path:    "POST /invite",
			Handler: &invite{DB: db},
			Cap:     model.CapInviteToBino,
		},
		{
			// Invite-form on GDriveAdmin
			Path:    "POST /invite/{email}",
			Handler: &invite{DB: db},
			Cap:     model.CapInviteToBino,
		},
		{
			Path:    "POST /invite/{id}/delete",
			Handler: &inviteDelete{DB: db},
			Cap:     model.CapInviteToBino,
		},
	}
}
