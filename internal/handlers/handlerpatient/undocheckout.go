package handlerpatient

import (
	"context"
	"log/slog"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive/url"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type undoCheckout struct {
	DB *db.Database
}

func (h *undoCheckout) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	lastEvent, err := h.DB.Q.GetLastEventForPatient(ctx, patient)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		if err := db.Q.UndoCheckoutPatient(ctx, patient); err != nil {
			return err
		}

		if err := db.Q.SetPatientStatus(ctx, sql.SetPatientStatusParams{
			ID:     patient,
			Status: int32(model.StatusAdmitted),
		}); err != nil {
			return err
		}

		if err := db.Q.MovePatient(ctx, sql.MovePatientParams{
			ID:         patient,
			CurrHomeID: pgtype.Int4{Int32: lastEvent.HomeID, Valid: true},
		}); err != nil {
			return err
		}

		if _, err := db.Q.AddPatientEvent(ctx, sql.AddPatientEventParams{
			PatientID: patient,
			AppuserID: commonData.User.AppuserID,
			HomeID:    lastEvent.HomeID,
			EventID:   int32(model.EventIDUndidCheckout),
			Time:      pgtype.Timestamptz{Time: time.Now(), Valid: true},
		}); err != nil {
			return err
		}

		return nil
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if cfg, err := h.DB.GetHomeConfig(ctx, lastEvent.HomeID); err == nil {
		if cfg.PatientAutoSort {
			if err := h.DB.ApplyPatientSort(ctx, lastEvent.HomeID, commonData.Lang32()); err != nil {
				slog.Warn("applying patient sort on undo checkout", "error", err)
			}
		}
	}

	if patientData, err := h.DB.Q.GetPatient(ctx, patient); err == nil {
		commonData.Info(
			commonData.Language.UndoCheckoutSuccessful(patientData.Name),
			PatientButtons(commonData, patient, url.IDToDocumentURL(patientData.GoogleID.String))...,
		)
	}

	request.RedirectToReferer(w, r)
}
