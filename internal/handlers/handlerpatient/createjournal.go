package handlerpatient

import (
	"fmt"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/config"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type createJournal struct {
	DB           *db.Database
	GDriveWorker *gdrive.Worker
	Config       *config.Config
}

func (h *createJournal) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patientData, err := h.DB.Q.GetPatientWithSpecies(ctx, sql.GetPatientWithSpeciesParams{
		ID:         patient,
		LanguageID: int32(h.Config.SystemLanguage),
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if patientData.GoogleID.Valid {
		commonData.Warning(commonData.Language.TODO("journal URL already exists"), nil)
		request.RedirectToReferer(w, r)
		return
	}

	created, err := h.DB.Q.GetFirstEventOfTypeForPatient(ctx, sql.GetFirstEventOfTypeForPatientParams{
		PatientID: patient,
		EventID:   int32(model.EventIDRegistered),
	})
	if err != nil || !created.Valid {
		request.LogError(r, fmt.Errorf("bad creation time, using current time: %w", err))
		created = pgtype.Timestamptz{Time: time.Now(), Valid: true}
	}

	item, err := h.GDriveWorker.CreateJournal(patientData.CurrHomeID.Int32, gdrive.TemplateVars{
		Time:    created.Time,
		Name:    patientData.Name,
		Species: patientData.SpeciesName,
		BinoURL: h.Config.BinoURLForPatient(patient),
	})
	if err != nil {
		commonData.Error(commonData.Language.TODO("failed to create"), err)
		request.RedirectToReferer(w, r)
		return
	}

	if tag, err := h.DB.Q.SetPatientJournal(ctx, sql.SetPatientJournalParams{
		ID: patient,
		GoogleID: pgtype.Text{
			String: item.ID,
			Valid:  true,
		},
	}); err != nil || tag.RowsAffected() == 0 {
		commonData.Error(commonData.Language.TODO("failed to set in DB"), err)
		request.RedirectToReferer(w, r)
		return
	}

	if _, err := h.DB.Q.AddPatientEvent(ctx, sql.AddPatientEventParams{
		PatientID: patient,
		HomeID:    patientData.CurrHomeID.Int32,
		EventID:   int32(model.EventIDJournalCreated),
		AppuserID: commonData.User.AppuserID,
		Time:      pgtype.Timestamptz{Time: time.Now(), Valid: true},
	}); err != nil {
		commonData.Warning(commonData.Language.TODO("failed to create event"), err)
	}

	commonData.Success(commonData.Language.TODO("document created"))
	request.RedirectToReferer(w, r)
}
