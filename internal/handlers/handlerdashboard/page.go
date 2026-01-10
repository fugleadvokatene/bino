package handlerdashboard

import (
	"cmp"
	"net/http"
	"slices"
	"time"

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

	users, err := h.DB.Q.GetAppusersInDivision(ctx, commonData.User.PreferredHome.Division) // TODO(perf) use a more specific query
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homes, err := h.DB.Homes(ctx, commonData.User.PreferredHome.Division)
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

	currSpeciesDistribution, err := h.DB.GetCurrentSpeciesDistribution(ctx, commonData.Lang())
	if err != nil {
		currSpeciesDistribution = nil
	}
	if len(currSpeciesDistribution) > 8 {
		currSpeciesDistribution[7].Species = commonData.Language.SpeciesOther
		for i := 8; i < len(currSpeciesDistribution); i++ {
			currSpeciesDistribution[7].Count += currSpeciesDistribution[i].Count
		}
		currSpeciesDistribution = currSpeciesDistribution[:8]
	}

	historicalSpeciesDistribution, err := h.DB.GetSpeciesDistributionOverTime(ctx, time.Now().AddDate(-1, 0, 0), time.Now(), commonData.Lang())
	if err != nil {
		historicalSpeciesDistribution = nil
	}

	// Attach patients to homes
	generic.GroupByID(
		homes,
		patients,
		func(h *model.Home) int32 { return h.ID },
		func(p *sql.GetActivePatientsRow) int32 { return p.CurrHomeID.Int32 },
		func(h *model.Home, p *sql.GetActivePatientsRow) {
			h.Patients = append(h.Patients, p.ToModel())
		},
	)

	// Attach users to homes
	generic.GroupByID(
		homes,
		users,
		func(h *model.Home) int32 { return h.ID },
		func(u *sql.Appuser) int32 { return u.HomeID.Int32 },
		func(h *model.Home, u *sql.Appuser) {
			h.Users = append(h.Users, u.ToModel())
		},
	)

	// Attach unavailable-periods to homes
	generic.GroupByID(
		homes,
		unavailablePeriods,
		func(h *model.Home) int32 { return h.ID },
		func(p *sql.HomeUnavailable) int32 { return p.HomeID },
		func(h *model.Home, p *sql.HomeUnavailable) {
			h.UnavailablePeriods = append(h.UnavailablePeriods, p.ToModel())
		},
	)

	var preferredHomeView model.Home
	if preferredHomeIdx := generic.Find(homes, func(h model.Home) bool {
		return h.ID == commonData.User.PreferredHome.ID
	}); preferredHomeIdx != -1 {
		preferredHomeView = homes[preferredHomeIdx]
		homes = append(homes[:preferredHomeIdx], homes[preferredHomeIdx+1:]...)
	}
	preferredHomeView.PreferredSpecies = preferredSpecies
	preferredHomeView.NonPreferredSpecies = otherSpecies

	defaultSpecies := int32(1)
	if len(preferredSpecies) > 0 {
		defaultSpecies = preferredSpecies[0].ID
	}

	slices.SortStableFunc(homes, func(a, b model.Home) int { return cmp.Compare(a.Name, b.Name) })

	_ = DashboardPage(commonData, defaultSpecies, &preferredHomeView, homes, h.MascotURL, currSpeciesDistribution, historicalSpeciesDistribution).Render(r.Context(), w)
}
