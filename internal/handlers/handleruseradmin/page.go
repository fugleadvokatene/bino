package handleruseradmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
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

	UserAdmin(
		data,
		model.SliceToModel(homes),
		model.SliceToModel(users),
		model.SliceToModel(invitations),
	).Render(ctx, w)
}
