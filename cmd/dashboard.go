package main

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handleraccess"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerjson"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerlogin"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/view"
	"github.com/jackc/pgx/v5/pgtype"
)

type DashboardData struct {
	PreferredHomeView      view.Home
	DefaultSelectedSpecies int32
	NonPreferredSpecies    []view.Species
	Homes                  []view.Home
}

func (server *Server) getSpeciesForUser(ctx context.Context, user int32) ([]view.Species, []view.Species, error) {
	commonData := request.MustLoadCommonData(ctx)

	preferredSpeciesRows, err := server.DB.Q.GetPreferredSpeciesForHome(ctx, sql.GetPreferredSpeciesForHomeParams{
		HomeID:     user,
		LanguageID: commonData.Lang32(),
	})
	if err != nil {
		return nil, nil, err
	}
	preferredSpecies := generic.SliceToSlice(preferredSpeciesRows, func(in sql.GetPreferredSpeciesForHomeRow) view.Species {
		return in.ToSpeciesView()
	})

	otherSpeciesRows, err := server.DB.Q.GetSpeciesWithLanguage(ctx, commonData.Lang32())
	if err != nil {
		return nil, nil, err
	}
	otherSpecies := generic.SliceToSlice(generic.FilterSlice(otherSpeciesRows, func(in sql.GetSpeciesWithLanguageRow) bool {
		return generic.Find(preferredSpecies, func(preferred view.Species) bool {
			return preferred.ID == in.SpeciesID
		}) == -1
	}), func(in sql.GetSpeciesWithLanguageRow) view.Species {
		return in.ToSpeciesView(false)
	})
	return preferredSpecies, otherSpecies, nil
}

func (server *Server) mainHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	if commonData.User != nil {
		server.dashboardHandler(w, r)
	} else {
		handlerlogin.Handler(w, r)
	}
}

func (server *Server) dashboardHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	commonData.Subtitle = commonData.Language.NavbarDashboard

	preferredSpecies, otherSpecies, err := server.getSpeciesForUser(ctx, commonData.User.PreferredHome.ID)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	users, err := server.DB.Q.GetAppusers(ctx) // TODO(perf) use a more specific query
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homes, err := server.DB.Q.GetHomes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patients, err := server.DB.Q.GetActivePatients(ctx, commonData.Lang32())
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	unavailablePeriods, err := server.DB.Q.GetAllUnavailablePeriods(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homeViews := generic.SliceToSlice(homes, func(h sql.Home) view.Home {
		return view.Home{
			ID:       h.ID,
			Capacity: h.Capacity,
			Name:     h.Name,
			Note:     h.Note,
			Patients: generic.SliceToSlice(generic.FilterSlice(patients, func(p sql.GetActivePatientsRow) bool {
				return p.CurrHomeID.Valid && p.CurrHomeID.Int32 == h.ID
			}), func(p sql.GetActivePatientsRow) view.Patient {
				return p.ToPatientView()
			}),
			Users: generic.SliceToSlice(generic.FilterSlice(users, func(u sql.GetAppusersRow) bool {
				return u.HomeID.Valid && u.HomeID.Int32 == h.ID
			}), func(u sql.GetAppusersRow) view.User {
				return u.ToUserView()
			}),
			UnavailablePeriods: generic.SliceToSlice(generic.FilterSlice(unavailablePeriods, func(p sql.HomeUnavailable) bool {
				return p.HomeID == h.ID
			}), func(in sql.HomeUnavailable) view.Period {
				return in.ToPeriodView()
			}),
		}
	})

	var preferredHomeView view.Home
	if preferredHomeIdx := generic.Find(homes, func(h sql.Home) bool {
		return h.ID == commonData.User.PreferredHome.ID
	}); preferredHomeIdx != -1 {
		preferredHomeView = homeViews[preferredHomeIdx]
		homeViews = append(homeViews[:preferredHomeIdx], homeViews[preferredHomeIdx+1:]...)
	}
	preferredHomeView.PreferredSpecies = preferredSpecies

	defaultSpecies := int32(1)
	if len(preferredSpecies) > 0 {
		defaultSpecies = preferredSpecies[0].ID
	}

	_ = DashboardPage(commonData, &DashboardData{
		NonPreferredSpecies:    otherSpecies,
		DefaultSelectedSpecies: defaultSpecies,
		PreferredHomeView:      preferredHomeView,
		Homes:                  homeViews,
	}).Render(r.Context(), w)
}

func (server *Server) postCheckinHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	if !handleraccess.EnsureAccess(w, r, enums.AccessLevelRehabber) {
		return
	}

	name, err := request.GetFormValue(r, "name")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	createJournal := false
	if _, err := request.GetFormValue(r, "journal-action"); err == nil {
		createJournal = true
	}

	fields, err := request.GetFormIDs(r, "home", "species")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	systemSpeciesName, err := server.DB.Q.GetNameOfSpecies(ctx, sql.GetNameOfSpeciesParams{
		SpeciesID:  fields["species"],
		LanguageID: int32(server.Config.SystemLanguage),
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	var patientID int32
	if err := server.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		var err error
		patientID, err = db.Q.AddPatient(ctx, sql.AddPatientParams{
			SpeciesID:  fields["species"],
			CurrHomeID: pgtype.Int4{Int32: fields["home"], Valid: true},
			Name:       name,
			Status:     int32(enums.StatusAdmitted),
		})
		if err != nil {
			return err
		}

		if _, err := db.Q.AddPatientEvent(ctx, sql.AddPatientEventParams{
			PatientID: patientID,
			AppuserID: commonData.User.AppuserID,
			EventID:   int32(enums.EventRegistered),
			HomeID:    fields["home"],
			Note:      "",
			Time:      pgtype.Timestamptz{Time: time.Now(), Valid: true},
		}); err != nil {
			return fmt.Errorf("registering patient: %w", err)
		}
		return nil
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	suggestJournal := true
	if createJournal {
		if item, err := server.GDriveWorker.CreateJournal(GDriveTemplateVars{
			Time:    time.Now(),
			Name:    name,
			Species: systemSpeciesName,
			BinoURL: server.Config.BinoURLForPatient(patientID),
		}); err != nil {
			commonData.Warning(commonData.Language.GDriveCreateJournalFailed, err)
		} else {
			if tag, err := server.DB.Q.SetPatientJournal(ctx, sql.SetPatientJournalParams{
				ID:         patientID,
				JournalUrl: pgtype.Text{String: item.DocumentURL(), Valid: true},
			}); err != nil || tag.RowsAffected() == 0 {
				commonData.Warning(commonData.Language.GDriveCreateJournalFailed, err)
			} else {
				suggestJournal = false
			}
		}
	}
	if suggestJournal {
		if err := server.DB.SuggestJournalBasedOnSearch(ctx, patientID, name, systemSpeciesName, fields["home"]); err != nil {
			request.LogCtx(ctx, "suggesting journal: %v", err)
		}
	}
	request.RedirectToReferer(w, r)
}

func (server *Server) movePatientHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	newHomeID, err := request.GetFormID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patientData, err := server.DB.Q.GetPatient(ctx, patient)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := server.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		if err := db.Q.MovePatient(ctx, sql.MovePatientParams{
			ID:         patient,
			CurrHomeID: pgtype.Int4{Int32: newHomeID, Valid: true},
		}); err != nil {
			return err
		}

		db.Q.AddPatientEvent(ctx, sql.AddPatientEventParams{
			PatientID:    patient,
			AppuserID:    commonData.User.AppuserID,
			HomeID:       newHomeID,
			EventID:      int32(enums.EventTransferredToOtherHome),
			AssociatedID: patientData.CurrHomeID,
			Note:         "",
			Time:         pgtype.Timestamptz{Time: time.Now(), Valid: true},
		})

		return nil
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func (server *Server) postCheckoutHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	status, err := request.GetFormID(r, "status")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	note, _ := request.GetFormValue(r, "note")

	patientData, err := server.DB.Q.GetPatient(ctx, patient)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := server.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		now := pgtype.Timestamptz{Time: time.Now(), Valid: true}

		if err := db.Q.CheckoutPatient(ctx, sql.CheckoutPatientParams{
			ID:           patientData.ID,
			TimeCheckout: now,
		}); err != nil {
			return err
		}

		if err := db.Q.SetPatientStatus(ctx, sql.SetPatientStatusParams{
			ID:     patient,
			Status: status,
		}); err != nil {
			return err
		}

		if err := db.Q.MovePatient(ctx, sql.MovePatientParams{
			ID:         patient,
			CurrHomeID: pgtype.Int4{},
		}); err != nil {
			return err
		}

		var event enums.Event
		var associatedID pgtype.Int4
		switch status {
		case int32(enums.StatusDead):
			event = enums.EventDied
		case int32(enums.StatusDeleted):
			event = enums.EventDeleted
		case int32(enums.StatusEuthanized):
			event = enums.EventEuthanized
		case int32(enums.StatusReleased):
			event = enums.EventReleased
		case int32(enums.StatusTransferredOutsideOrganization):
			event = enums.EventTransferredOutsideOrganization
		default:
			event = enums.EventStatusChanged
			associatedID = pgtype.Int4{Int32: int32(status), Valid: true}
		}

		if _, err := db.Q.AddPatientEvent(ctx, sql.AddPatientEventParams{
			PatientID:    patient,
			AppuserID:    commonData.User.AppuserID,
			HomeID:       patientData.CurrHomeID.Int32,
			EventID:      int32(event),
			AssociatedID: associatedID,
			Note:         note,
			Time:         now,
		}); err != nil {
			return err
		}

		return nil
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func (server *Server) postSetNameHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	newName, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patientData, err := server.DB.Q.GetPatient(ctx, patient)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if newName == patientData.Name {
		request.RedirectToReferer(w, r)
		return
	}

	if err := server.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		if err := db.Q.SetPatientName(ctx, sql.SetPatientNameParams{
			ID:   patient,
			Name: newName,
		}); err != nil {
			return err
		}

		if _, err := db.Q.AddPatientEvent(ctx, sql.AddPatientEventParams{
			PatientID: patient,
			HomeID:    patientData.CurrHomeID.Int32,
			EventID:   int32(enums.EventNameChanged),
			Note:      fmt.Sprintf("'%s' -> '%s'", patientData.Name, newName),
			AppuserID: commonData.User.AppuserID,
			Time:      pgtype.Timestamptz{Time: time.Now(), Valid: true},
		}); err != nil {
			return err
		}

		return nil
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

type ReorderRequest struct {
	ID    int32
	Order []int32
}

func (server *Server) ajaxReorderHandler(w http.ResponseWriter, r *http.Request) {
	handlerjson.Handler(server.DB, w, r, func(db *db.Database, req ReorderRequest) error {
		ctx := r.Context()
		return sortPatients(ctx, server.DB, req)
	})
}

func sortPatients(ctx context.Context, db *db.Database, req ReorderRequest) error {
	ids := []int32{}
	orders := []int32{}
	for idx, id := range req.Order {
		ids = append(ids, id)
		orders = append(orders, int32(idx))
	}
	return db.Q.UpdatePatientSortOrder(ctx, sql.UpdatePatientSortOrderParams{
		Ids:    ids,
		Orders: orders,
	})
}
