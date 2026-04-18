package handlerpatient

import (
	"context"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/bespoke"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type checkout struct {
	DB      *db.Database
	bespoke bespoke.Bespoke
}

func (h *checkout) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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

	patientData, err := h.DB.Q.GetPatient(ctx, patient)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
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

		var event model.EventID
		var statusField pgtype.Int4
		switch status {
		case int32(model.StatusDead):
			event = model.EventIDDied
		case int32(model.StatusDeleted):
			event = model.EventIDDeleted
		case int32(model.StatusEuthanized):
			event = model.EventIDEuthanized
		case int32(model.StatusReleased):
			event = model.EventIDReleased
		case int32(model.StatusTransferredOutsideOrganization):
			event = model.EventIDTransferredOutsideOrganization
		default:
			event = model.EventIDStatusChanged
			statusField = pgtype.Int4{Int32: status, Valid: true}
		}

		_, err := db.Q.AddPatientEvent(ctx, sql.AddPatientEventParams{
			PatientID: patient,
			AppuserID: commonData.User.AppuserID,
			HomeID:    patientData.CurrHomeID.Int32,
			EventID:   int32(event),
			Status:    statusField,
			Note:      note,
			Time:      now,
		})
		if err != nil {
			return err
		}

		if err := db.Q.DeleteSchedulesForPatient(ctx, patient); err != nil {
			return err
		}

		if h.bespoke != nil {
			h.bespoke.EditJournalOnEvent(ctx, patient, event, note, now.Time)
		}

		return nil
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
