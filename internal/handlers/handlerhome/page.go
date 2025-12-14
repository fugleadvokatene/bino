package handlerhome

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type page struct {
	DB *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homeData, err := h.DB.Q.GetHome(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	commonData.Subtitle = homeData.Name

	users, err := h.DB.Q.GetAppusersForHome(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patients, err := h.DB.Q.GetCurrentPatientsForHome(ctx, sql.GetCurrentPatientsForHomeParams{
		CurrHomeID: pgtype.Int4{Int32: id, Valid: true},
		LanguageID: commonData.Lang32(),
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homes, err := h.DB.Q.GetHomes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	preferredSpecies, otherSpecies, err := h.DB.GetSpeciesForUser(ctx, homeData.ID, commonData.Lang())
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	unavailablePeriods, err := h.DB.Q.GetHomeUnavailablePeriods(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	HomePage(ctx, commonData, generic.SliceToSlice(homes, func(h sql.Home) model.Home {
		return h.ToHomeView()
	}),
		&model.Home{
			ID:       homeData.ID,
			Name:     homeData.Name,
			Note:     homeData.Note,
			Capacity: homeData.Capacity,
			Users: generic.SliceToSlice(users, func(u sql.Appuser) model.User {
				return u.ToUserView()
			}),
			Patients: generic.SliceToSlice(patients, func(p sql.GetCurrentPatientsForHomeRow) model.Patient {
				return p.ToPatientView()
			}),
			PreferredSpecies:    preferredSpecies,
			NonPreferredSpecies: otherSpecies,
			UnavailablePeriods: generic.SliceToSlice(unavailablePeriods, func(in sql.HomeUnavailable) model.Period {
				return in.ToPeriodView()
			}),
		}).Render(r.Context(), w)
}
