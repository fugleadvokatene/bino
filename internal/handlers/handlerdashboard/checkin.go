package handlerdashboard

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/config"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/handlers/handleraccess"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/sse"
	"github.com/jackc/pgx/v5/pgtype"
)

type checkin struct {
	BackgroundCtx context.Context
	DB            *db.Database
	Config        *config.Config
	GDriveWorker  *gdrive.Worker
	Broker        *sse.Broker
}

func (h *checkin) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	if !handleraccess.EnsureAccess(w, r, model.AccessLevelRehabber) {
		return
	}

	name, err := request.GetFormValue(r, "name")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	createJournal := false
	if _, err := request.GetFormValue(r, "create-journal"); err == nil {
		createJournal = true
	}

	fields, err := request.GetFormIDs(r, "home", "species")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	systemSpeciesName, err := h.DB.Q.GetNameOfSpecies(ctx, sql.GetNameOfSpeciesParams{
		SpeciesID:  fields["species"],
		LanguageID: int32(h.Config.SystemLanguage),
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	var patientID int32
	if err := h.DB.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		var err error
		patientID, err = db.Q.AddPatient(ctx, sql.AddPatientParams{
			SpeciesID:      fields["species"],
			CurrHomeID:     pgtype.Int4{Int32: fields["home"], Valid: true},
			Name:           name,
			Status:         int32(model.StatusAdmitted),
			JournalPending: createJournal,
		})
		if err != nil {
			return err
		}

		if _, err := db.Q.AddPatientEvent(ctx, sql.AddPatientEventParams{
			PatientID: patientID,
			AppuserID: commonData.User.AppuserID,
			EventID:   int32(model.EventIDRegistered),
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

	// Create or suggest journal off-request
	go h.createOrSuggestJournal(
		commonData.Language,
		name,
		systemSpeciesName,
		patientID,
		fields["home"],
		createJournal,
	)

	commonData.Info(commonData.Language.CheckinSuccessful(name))

	request.RedirectToReferer(w, r)
}

func (h *checkin) createOrSuggestJournal(
	language *language.Language,
	name string,
	systemSpeciesName string,
	patientID int32,
	homeID int32,
	tryCreate bool,
) {
	ctx := h.BackgroundCtx
	if tryCreate {
		if item, err := h.GDriveWorker.CreateJournal(
			homeID,
			gdrive.TemplateVars{
				Time:    time.Now(),
				Name:    name,
				Species: systemSpeciesName,
				BinoURL: h.Config.BinoURLForPatient(patientID),
			},
		); err != nil {
			slog.Warn(language.GDriveCreateJournalFailed, "error", err)
		} else {
			if tag, err := h.DB.Q.SetPatientJournal(ctx, sql.SetPatientJournalParams{
				ID:       patientID,
				GoogleID: pgtype.Text{String: item.ID, Valid: true},
			}); err != nil || tag.RowsAffected() == 0 {
				slog.Warn(language.GDriveCreateJournalFailed, "error", err)
			} else {
				// Give the page a little time to load and set up the event source
				time.Sleep(time.Second)

				h.Broker.JournalCreated(ctx, patientID, item.DocumentURL())
				return
			}
		}
	}
	if err := h.DB.SuggestJournalBasedOnSearch(
		ctx,
		patientID,
		name,
		systemSpeciesName,
		homeID,
	); err != nil {
		slog.Warn("suggesting journal", "error", err)
	}
	if err := h.DB.Q.SetPatientJournalPending(ctx, sql.SetPatientJournalPendingParams{
		ID:             patientID,
		JournalPending: false,
	}); err != nil {
		slog.Warn("suggesting journal", "error", err)
	}
}
