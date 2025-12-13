package main

import (
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/view"
	"github.com/jackc/pgx/v5/pgtype"
)

func (server *Server) getPatientHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patientData, err := server.DB.Q.GetPatientWithSpecies(ctx, sql.GetPatientWithSpeciesParams{
		ID:         id,
		LanguageID: commonData.Lang32(),
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	commonData.Subtitle = patientData.Name

	var home *view.Home
	if patientData.CurrHomeID.Valid {
		homeResult, err := server.DB.Q.GetHome(ctx, patientData.CurrHomeID.Int32)
		if err != nil {
			handlererror.Error(w, r, err)
			return
		}
		h := homeResult.ToHomeView()
		home = &h
	}

	homes, err := server.DB.Q.GetHomes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	eventData, err := server.DB.Q.GetEventsForPatient(ctx, patientData.ID)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	events := generic.SliceToSlice(eventData, func(r sql.GetEventsForPatientRow) view.Event {
		return view.Event{
			ID:           r.ID,
			PatientID:    r.PatientID,
			HomeID:       r.HomeID,
			Note:         r.Note,
			EventID:      r.EventID,
			AssociatedID: r.AssociatedID,
			AppuserID:    r.AppuserID,
			HomeName:     r.HomeName,
			UserName:     r.UserName,
			AvatarUrl:    r.AvatarUrl,
			TimeRel:      commonData.Language.FormatTimeRel(r.Time.Time),
			TimeAbs:      commonData.Language.FormatTimeAbs(r.Time.Time),
			Time:         r.Time.Time,
			User: view.User{
				ID:           r.AppuserID,
				Name:         r.UserName,
				AvatarURL:    r.AvatarUrl.String,
				HasAvatarURL: r.AvatarUrl.Valid,
				Email:        "",
			},
			Home: view.Home{
				ID:   r.HomeID,
				Name: r.HomeName,
			},
		}
	})

	PatientPage(ctx, commonData, view.PatientPage{
		Patient: patientData.ToPatientView(),
		Home:    home,
		Homes: generic.SliceToSlice(homes, func(home sql.Home) view.Home {
			return home.ToHomeView()
		}),
		Events: events,
	}, server).Render(ctx, w)
}

func (server *Server) createJournalHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patientData, err := server.DB.Q.GetPatientWithSpecies(ctx, sql.GetPatientWithSpeciesParams{
		ID:         patient,
		LanguageID: int32(server.Config.SystemLanguage),
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if patientData.JournalUrl.Valid {
		commonData.Warning(commonData.Language.TODO("journal URL already exists"), nil)
		request.RedirectToReferer(w, r)
		return
	}

	created, err := server.DB.Q.GetFirstEventOfTypeForPatient(ctx, sql.GetFirstEventOfTypeForPatientParams{
		PatientID: patient,
		EventID:   int32(enums.EventRegistered),
	})
	if err != nil || !created.Valid {
		request.LogR(r, "vad creation date, using current time. Err=%v", err)
		created = pgtype.Timestamptz{Time: time.Now(), Valid: true}
	}

	item, err := server.GDriveWorker.CreateJournal(GDriveTemplateVars{
		Time:    created.Time,
		Name:    patientData.Name,
		Species: patientData.SpeciesName,
		BinoURL: server.Config.BinoURLForPatient(patient),
	})
	if err != nil {
		commonData.Error(commonData.Language.TODO("failed to create"), err)
		request.RedirectToReferer(w, r)
		return
	}

	if tag, err := server.DB.Q.SetPatientJournal(ctx, sql.SetPatientJournalParams{
		ID: patient,
		JournalUrl: pgtype.Text{
			String: item.DocumentURL(),
			Valid:  true,
		},
	}); err != nil || tag.RowsAffected() == 0 {
		commonData.Error(commonData.Language.TODO("failed to set in DB"), err)
		request.RedirectToReferer(w, r)
		return
	}

	if _, err := server.DB.Q.AddPatientEvent(ctx, sql.AddPatientEventParams{
		PatientID: patient,
		HomeID:    patientData.CurrHomeID.Int32,
		EventID:   int32(enums.EventJournalCreated),
		AppuserID: commonData.User.AppuserID,
		Time:      pgtype.Timestamptz{Time: time.Now(), Valid: true},
	}); err != nil {
		commonData.Warning(commonData.Language.TODO("failed to create event"), err)
	}

	commonData.Success(commonData.Language.TODO("document created"))
	request.RedirectToReferer(w, r)
}

func (server *Server) attachJournalHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	url, err := request.GetFormValue(r, "url")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	baseURL := gdrive.JournalRegex.FindString(url)
	if baseURL == "" {
		commonData.Error(commonData.Language.TODO("bad URL"), err)
		request.RedirectToReferer(w, r)
		return
	}

	patientData, err := server.DB.Q.GetPatient(ctx, patient)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if tag, err := server.DB.Q.SetPatientJournal(ctx, sql.SetPatientJournalParams{
		ID: patient,
		JournalUrl: pgtype.Text{
			String: baseURL,
			Valid:  true,
		},
	}); err != nil || tag.RowsAffected() == 0 {
		commonData.Error(commonData.Language.TODO("failed to set in DB"), err)
		request.RedirectToReferer(w, r)
		return
	}

	if _, err := server.DB.Q.AddPatientEvent(ctx, sql.AddPatientEventParams{
		PatientID: patient,
		HomeID:    patientData.CurrHomeID.Int32,
		EventID:   int32(enums.EventJournalAttached),
		AppuserID: commonData.User.AppuserID,
		Time:      pgtype.Timestamptz{Time: time.Now(), Valid: true},
	}); err != nil {
		commonData.Warning(commonData.Language.TODO("failed to create event"), err)
	}

	commonData.Success(commonData.Language.TODO("journal attached"))
	request.RedirectToReferer(w, r)
}

func (server *Server) acceptSuggestedJournalHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	if err := server.DB.Q.AcceptSuggestedJournal(ctx, patient); err != nil {
		commonData.Warning(commonData.Language.TODO("failed to accept suggested journal"), err)
	}
	request.RedirectToReferer(w, r)
}

func (server *Server) declineSuggestedJournalHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	if err := server.DB.Q.DeclineSuggestedJournal(ctx, patient); err != nil {
		commonData.Warning(commonData.Language.TODO("failed to decline suggested journal"), err)
	}
	request.RedirectToReferer(w, r)
}
