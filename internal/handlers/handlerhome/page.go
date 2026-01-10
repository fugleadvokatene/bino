package handlerhome

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
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

	home, err := h.DB.GetHome(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	commonData.Subtitle = home.Name

	users, err := h.DB.Q.GetAppusersForHome(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	home.Users = model.SliceToModel(users)

	patients, err := h.DB.Q.GetCurrentPatientsForHome(ctx, sql.GetCurrentPatientsForHomeParams{
		CurrHomeID: pgtype.Int4{Int32: id, Valid: true},
		LanguageID: commonData.Lang32(),
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	home.Patients = model.SliceToModel(patients)

	homes, err := h.DB.Q.GetHomes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	preferredSpecies, otherSpecies, err := h.DB.GetSpeciesForUser(ctx, home.ID, commonData.Lang())
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	home.PreferredSpecies = preferredSpecies
	home.NonPreferredSpecies = otherSpecies

	unavailablePeriods, err := h.DB.Q.GetHomeUnavailablePeriods(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	home.UnavailablePeriods = model.SliceToModel(unavailablePeriods)

	HomePage(ctx, commonData, model.SliceToModel(homes), &home).Render(r.Context(), w)
}
