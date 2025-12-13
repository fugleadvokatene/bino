package main

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerjson"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/view"
	"github.com/jackc/pgx/v5/pgtype"
)

func (server *Server) getHomeHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homeData, err := server.DB.Q.GetHome(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	commonData.Subtitle = homeData.Name

	users, err := server.DB.Q.GetAppusersForHome(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patients, err := server.DB.Q.GetCurrentPatientsForHome(ctx, sql.GetCurrentPatientsForHomeParams{
		CurrHomeID: pgtype.Int4{Int32: id, Valid: true},
		LanguageID: commonData.Lang32(),
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homes, err := server.DB.Q.GetHomes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	preferredSpecies, otherSpecies, err := server.getSpeciesForUser(ctx, homeData.ID)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	unavailablePeriods, err := server.DB.Q.GetHomeUnavailablePeriods(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	HomePage(ctx, commonData, &DashboardData{
		NonPreferredSpecies: otherSpecies,
		Homes: generic.SliceToSlice(homes, func(h sql.Home) view.Home {
			return h.ToHomeView()
		}),
	}, &view.Home{
		ID:       homeData.ID,
		Name:     homeData.Name,
		Note:     homeData.Note,
		Capacity: homeData.Capacity,
		Users: generic.SliceToSlice(users, func(u sql.Appuser) view.User {
			return u.ToUserView()
		}),
		Patients: generic.SliceToSlice(patients, func(p sql.GetCurrentPatientsForHomeRow) view.Patient {
			return p.ToPatientView()
		}),
		PreferredSpecies: preferredSpecies,
		UnavailablePeriods: generic.SliceToSlice(unavailablePeriods, func(in sql.HomeUnavailable) view.Period {
			return in.ToPeriodView()
		}),
	}).Render(r.Context(), w)
}

func (server *Server) setCapacityHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	capacity, err := request.GetFormID(r, "capacity")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := server.DB.Q.SetHomeCapacity(ctx, sql.SetHomeCapacityParams{
		ID:       id,
		Capacity: capacity,
	}); err != nil {
		commonData.Error(commonData.Language.GenericFailed, err)
	}

	request.RedirectToReferer(w, r)
}

func (server *Server) addPreferredSpeciesHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	species, err := request.GetFormID(r, "species")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := server.DB.Q.AddPreferredSpecies(ctx, sql.AddPreferredSpeciesParams{
		HomeID:    id,
		SpeciesID: species,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func (server *Server) deletePreferredSpeciesHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	species, err := request.GetPathID(r, "species")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := server.DB.Q.DeletePreferredSpecies(ctx, sql.DeletePreferredSpeciesParams{
		HomeID:    id,
		SpeciesID: species,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func (server *Server) reorderSpeciesHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	handlerjson.Handler(server.DB, w, r, func(db *db.Database, req ReorderRequest) error {
		if req.ID != id {
			return fmt.Errorf("mismatched ID between request data and URL (URL=%d, req=%d)", id, req.ID)
		}
		ids := []int32{}
		orders := []int32{}
		for idx, id := range req.Order {
			ids = append(ids, id)
			orders = append(orders, int32(idx))
		}
		return db.Q.UpdatePreferredSpeciesSortOrder(ctx, sql.UpdatePreferredSpeciesSortOrderParams{
			HomeID:    id,
			SpeciesID: ids,
			Orders:    orders,
		})
	})
}

func (server *Server) addHomeUnavailablePeriodHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	homeID, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	values, err := request.GetFormValues(r, "unavailable-from", "unavailable-to", "unavailable-note")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	var fromV view.Date
	var toV view.Date
	note, hasNote := values["unavailable-note"]

	if n, err := fmt.Sscanf(values["unavailable-from"], "%d-%d-%d", &fromV.Year, &fromV.Month, &fromV.Day); err != nil || n != 3 {
		commonData.Warning(commonData.Language.HomePeriodInvalid, err)
		request.RedirectToReferer(w, r)
		return
	}
	if n, err := fmt.Sscanf(values["unavailable-to"], "%d-%d-%d", &toV.Year, &toV.Month, &toV.Day); err != nil || n != 3 {
		commonData.Warning(commonData.Language.HomePeriodInvalid, err)
		request.RedirectToReferer(w, r)
		return
	}

	if toV.Before(fromV) {
		commonData.Warning(commonData.Language.HomePeriodInvalid, fmt.Errorf("to is before from: %+v < %+v", toV, fromV))
		request.RedirectToReferer(w, r)
		return
	}
	if _, err := server.DB.Q.AddHomeUnavailablePeriod(ctx, sql.AddHomeUnavailablePeriodParams{
		HomeID:   homeID,
		FromDate: fromV.ToPGDate(),
		ToDate:   toV.ToPGDate(),
		Note:     pgtype.Text{String: note, Valid: hasNote && note != ""},
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func (server *Server) deleteHomeUnavailableHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	periodID, err := request.GetPathID(r, "period")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := server.DB.Q.DeleteHomeUnavailablePeriod(ctx, periodID); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func (server *Server) homeSetNoteHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	homeID, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	note, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := server.DB.Q.SetHomeNote(ctx, sql.SetHomeNoteParams{
		ID:   homeID,
		Note: note,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
