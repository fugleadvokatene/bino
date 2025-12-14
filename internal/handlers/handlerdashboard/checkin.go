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
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type checkin struct {
	DB           *db.Database
	Config       *config.Config
	GDriveWorker *gdrive.Worker
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
			SpeciesID:  fields["species"],
			CurrHomeID: pgtype.Int4{Int32: fields["home"], Valid: true},
			Name:       name,
			Status:     int32(model.StatusAdmitted),
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

	go func() {
		suggestJournal := true
		if createJournal {
			if item, err := h.GDriveWorker.CreateJournal(gdrive.TemplateVars{
				Time:    time.Now(),
				Name:    name,
				Species: systemSpeciesName,
				BinoURL: h.Config.BinoURLForPatient(patientID),
			}); err != nil {
				slog.Warn(commonData.Language.GDriveCreateJournalFailed, "error", err)
			} else {
				if tag, err := h.DB.Q.SetPatientJournal(context.Background(), sql.SetPatientJournalParams{
					ID:         patientID,
					JournalUrl: pgtype.Text{String: item.DocumentURL(), Valid: true},
				}); err != nil || tag.RowsAffected() == 0 {
					slog.Warn(commonData.Language.GDriveCreateJournalFailed, "error", err)
				} else {
					suggestJournal = false
				}
			}
		}
		if suggestJournal {
			if err := h.DB.SuggestJournalBasedOnSearch(context.Background(), patientID, name, systemSpeciesName, fields["home"]); err != nil {
				slog.Warn("suggesting journal", "error", err)
			}
		}
	}()
	request.RedirectToReferer(w, r)
}
