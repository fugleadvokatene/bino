package handleruseradmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type page struct {
	DB *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	users, err := h.DB.Q.GetAppusers(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	invitations, err := h.DB.Q.GetInvitations(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homes, err := h.DB.Q.GetHomes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	UserAdmin(data, generic.SliceToSlice(homes, func(in sql.Home) model.Home {
		return in.ToModel()
	}), generic.SliceToSlice(users, func(in sql.GetAppusersRow) model.User {
		return in.ToModel()
	}), generic.SliceToSlice(invitations, func(in sql.GetInvitationsRow) model.Invitation {
		return in.ToModel()
	})).Render(ctx, w)
}
