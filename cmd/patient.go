package main

import (
	"net/http"
	"regexp"
	"time"

	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/view"
	"github.com/jackc/pgx/v5/pgtype"
)

var journalRegex = regexp.MustCompile(`(https:\/\/docs\.google\.com\/document\/d\/[^\/?#\n]+)`)

func (server *Server) getPatientHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := MustLoadCommonData(ctx)

	id, err := server.getPathID(r, "patient")
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	patientData, err := server.Queries.GetPatientWithSpecies(ctx, GetPatientWithSpeciesParams{
		ID:         id,
		LanguageID: commonData.Lang32(),
	})
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	commonData.Subtitle = patientData.Name

	var home *view.Home
	if patientData.CurrHomeID.Valid {
		homeResult, err := server.Queries.GetHome(ctx, patientData.CurrHomeID.Int32)
		if err != nil {
			server.renderError(w, r, commonData, err)
			return
		}
		h := homeResult.ToHomeView()
		home = &h
	}

	homes, err := server.Queries.GetHomes(ctx)
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	eventData, err := server.Queries.GetEventsForPatient(ctx, patientData.ID)
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	events := SliceToSlice(eventData, func(r GetEventsForPatientRow) view.Event {
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
		Homes: SliceToSlice(homes, func(home Home) view.Home {
			return home.ToHomeView()
		}),
		Events: events,
	}, server).Render(ctx, w)
}

func (server *Server) createJournalHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := MustLoadCommonData(ctx)

	patient, err := server.getPathID(r, "patient")
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	patientData, err := server.Queries.GetPatientWithSpecies(ctx, GetPatientWithSpeciesParams{
		ID:         patient,
		LanguageID: int32(server.Config.SystemLanguage),
	})
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	if patientData.JournalUrl.Valid {
		commonData.Warning(commonData.Language.TODO("journal URL already exists"), nil)
		server.redirectToReferer(w, r)
		return
	}

	created, err := server.Queries.GetFirstEventOfTypeForPatient(ctx, GetFirstEventOfTypeForPatientParams{
		PatientID: patient,
		EventID:   int32(enums.EventRegistered),
	})
	if err != nil || !created.Valid {
		LogR(r, "vad creation date, using current time. Err=%v", err)
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
		server.redirectToReferer(w, r)
		return
	}

	if tag, err := server.Queries.SetPatientJournal(ctx, SetPatientJournalParams{
		ID: patient,
		JournalUrl: pgtype.Text{
			String: item.DocumentURL(),
			Valid:  true,
		},
	}); err != nil || tag.RowsAffected() == 0 {
		commonData.Error(commonData.Language.TODO("failed to set in DB"), err)
		server.redirectToReferer(w, r)
		return
	}

	if _, err := server.Queries.AddPatientEvent(ctx, AddPatientEventParams{
		PatientID: patient,
		HomeID:    patientData.CurrHomeID.Int32,
		EventID:   int32(enums.EventJournalCreated),
		AppuserID: commonData.User.AppuserID,
		Time:      pgtype.Timestamptz{Time: time.Now(), Valid: true},
	}); err != nil {
		commonData.Warning(commonData.Language.TODO("failed to create event"), err)
	}

	commonData.Success(commonData.Language.TODO("document created"))
	server.redirectToReferer(w, r)
}

func (server *Server) attachJournalHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := MustLoadCommonData(ctx)

	patient, err := server.getPathID(r, "patient")
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	url, err := server.getFormValue(r, "url")
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	baseURL := journalRegex.FindString(url)
	if baseURL == "" {
		commonData.Error(commonData.Language.TODO("bad URL"), err)
		server.redirectToReferer(w, r)
		return
	}

	patientData, err := server.Queries.GetPatient(ctx, patient)
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	if tag, err := server.Queries.SetPatientJournal(ctx, SetPatientJournalParams{
		ID: patient,
		JournalUrl: pgtype.Text{
			String: baseURL,
			Valid:  true,
		},
	}); err != nil || tag.RowsAffected() == 0 {
		commonData.Error(commonData.Language.TODO("failed to set in DB"), err)
		server.redirectToReferer(w, r)
		return
	}

	if _, err := server.Queries.AddPatientEvent(ctx, AddPatientEventParams{
		PatientID: patient,
		HomeID:    patientData.CurrHomeID.Int32,
		EventID:   int32(enums.EventJournalAttached),
		AppuserID: commonData.User.AppuserID,
		Time:      pgtype.Timestamptz{Time: time.Now(), Valid: true},
	}); err != nil {
		commonData.Warning(commonData.Language.TODO("failed to create event"), err)
	}

	commonData.Success(commonData.Language.TODO("journal attached"))
	server.redirectToReferer(w, r)
}

func (server *Server) acceptSuggestedJournalHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := MustLoadCommonData(ctx)

	patient, err := server.getPathID(r, "patient")
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}
	if err := server.Queries.AcceptSuggestedJournal(ctx, patient); err != nil {
		commonData.Warning(commonData.Language.TODO("failed to accept suggested journal"), err)
	}
	server.redirectToReferer(w, r)
}

func (server *Server) declineSuggestedJournalHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := MustLoadCommonData(ctx)

	patient, err := server.getPathID(r, "patient")
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}
	if err := server.Queries.DeclineSuggestedJournal(ctx, patient); err != nil {
		commonData.Warning(commonData.Language.TODO("failed to decline suggested journal"), err)
	}
	server.redirectToReferer(w, r)
}
