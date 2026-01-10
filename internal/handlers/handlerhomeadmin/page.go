package handlerhomeadmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
)

type page struct {
	DB *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	// Get all users
	usersDB, err := h.DB.Q.GetAppusers(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	users := model.SliceToModel(usersDB)
	users, homeless := generic.PartitionSlice(users, func(in model.User) bool {
		return in.HomeID != 0
	})

	// Get all homes
	homesDB, err := h.DB.Q.GetHomes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	homes := model.SliceToModel(homesDB)

	// Put users in homes
	generic.GroupByID(
		homes,
		users,
		func(h *model.Home) int32 { return h.ID },
		func(u *model.User) int32 { return u.HomeID },
		func(h *model.Home, u *model.User) { h.Users = append(h.Users, *u) },
	)

	// Get all divisions
	divisions, err := h.DB.GetDivisions(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	// Put homes in divisions
	generic.GroupByID(
		divisions,
		homes,
		func(d *model.Division) int32 { return d.ID },
		func(h *model.Home) int32 { return h.Division },
		func(d *model.Division, h *model.Home) { d.Homes = append(d.Homes, *h) },
	)

	_ = HomesPage(commonData, homeless, divisions).Render(ctx, w)
}
