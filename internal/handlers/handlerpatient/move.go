package handlerpatient

import (
	"context"
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

type move struct {
	DB *db.Database
}

func (h *move) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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

	patientData, err := h.DB.Q.GetPatient(ctx, patient)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		if err := db.Q.MovePatient(ctx, sql.MovePatientParams{
			ID:         patient,
			CurrHomeID: pgtype.Int4{Int32: newHomeID, Valid: true},
		}); err != nil {
			return err
		}

		if _, err := db.Q.AddPatientEvent(ctx, sql.AddPatientEventParams{
			PatientID: patient,
			AppuserID: commonData.User.AppuserID,
			HomeID:    newHomeID,
			EventID:   int32(model.EventIDTransferredToOtherHome),
			Note:      "",
			Time:      pgtype.Timestamptz{Time: time.Now(), Valid: true},
		}); err != nil {
			return err
		}

		return nil
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	fromHomeName := ""
	if patientData.CurrHomeID.Valid {
		if home, err := h.DB.Q.GetHome(ctx, patientData.CurrHomeID.Int32); err == nil {
			fromHomeName = home.Name
		}
	}
	toHomeName := ""
	if home, err := h.DB.Q.GetHome(ctx, newHomeID); err == nil {
		toHomeName = home.Name
	}

	if updatedPatient, err := h.DB.Q.GetPatient(ctx, patient); err == nil {
		commonData.Info(
			commonData.Language.MoveSuccessful(patientData.Name, fromHomeName, toHomeName),
			PatientButtons(commonData, patient, url.IDToDocumentURL(updatedPatient.GoogleID.String))...,
		)
	}

	request.RedirectToReferer(w, r)
}
