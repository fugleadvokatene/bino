package handlerhomeadmin

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
	commonData := request.MustLoadCommonData(ctx)

	homesDB, err := h.DB.Q.GetHomes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	usersDB, err := h.DB.Q.GetAppusers(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homes := make([]HomeViewAdmin, len(homesDB))
	for i, home := range homesDB {
		homes[i] = HomeViewAdmin{
			ID:    home.ID,
			Name:  home.Name,
			Users: nil,
		}
	}

	// todo(perf): make it not O(N^2)
	homeless := []model.User{}
	for _, user := range usersDB {
		view := user.ToUserView()
		found := false
		if user.HomeID.Valid {
			for i, home := range homesDB {
				if home.ID == user.HomeID.Int32 {
					homes[i].Users = append(homes[i].Users, view)
					found = true
					break
				}
			}
		}
		if !found {
			homeless = append(homeless, view)
		}
	}

	_ = HomesPage(commonData, homes, homeless).Render(ctx, w)
}
