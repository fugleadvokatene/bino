package handlerdashboard

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type Page struct {
	DB        *db.Database
	MascotURL string
}

func (h *Page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	commonData.Subtitle = commonData.Language.NavbarDashboard

	preferredSpecies, otherSpecies, err := h.DB.GetSpeciesForUser(
		ctx,
		commonData.User.PreferredHome.ID,
		commonData.Lang(),
	)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	users, err := h.DB.Q.GetAppusers(ctx) // TODO(perf) use a more specific query
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homes, err := h.DB.Homes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patients, err := h.DB.Q.GetActivePatients(ctx, commonData.Lang32())
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	unavailablePeriods, err := h.DB.Q.GetAllUnavailablePeriods(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homeViews := generic.SliceToSlice(homes, func(h model.Home) model.Home {
		h.Patients = generic.SliceToSlice(generic.FilterSlice(patients, func(p sql.GetActivePatientsRow) bool {
			return p.CurrHomeID.Valid && p.CurrHomeID.Int32 == h.ID
		}), func(p sql.GetActivePatientsRow) model.Patient {
			return p.ToModel()
		})
		h.Users = generic.SliceToSlice(generic.FilterSlice(users, func(u sql.GetAppusersRow) bool {
			return u.HomeID.Valid && u.HomeID.Int32 == h.ID
		}), func(u sql.GetAppusersRow) model.User {
			return u.ToModel()
		})
		h.UnavailablePeriods = generic.SliceToSlice(generic.FilterSlice(unavailablePeriods, func(p sql.HomeUnavailable) bool {
			return p.HomeID == h.ID
		}), func(in sql.HomeUnavailable) model.Period {
			return in.ToModel()
		})
		return h
	})

	var preferredHomeView model.Home
	if preferredHomeIdx := generic.Find(homes, func(h model.Home) bool {
		return h.ID == commonData.User.PreferredHome.ID
	}); preferredHomeIdx != -1 {
		preferredHomeView = homeViews[preferredHomeIdx]
		homeViews = append(homeViews[:preferredHomeIdx], homeViews[preferredHomeIdx+1:]...)
	}
	preferredHomeView.PreferredSpecies = preferredSpecies
	preferredHomeView.NonPreferredSpecies = otherSpecies

	defaultSpecies := int32(1)
	if len(preferredSpecies) > 0 {
		defaultSpecies = preferredSpecies[0].ID
	}

	_ = DashboardPage(commonData, defaultSpecies, &preferredHomeView, homeViews, h.MascotURL).Render(r.Context(), w)
}
