package handlerpatient

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type setSpecies struct {
	DB *db.Database
}

func (h *setSpecies) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	newSpeciesID, err := request.GetFormID(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patientData, err := h.DB.Q.GetPatient(ctx, patient)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if newSpeciesID == patientData.SpeciesID {
		request.RedirectToReferer(w, r)
		return
	}

	prevSpeciesName, err := h.DB.Q.GetNameOfSpecies(ctx, sql.GetNameOfSpeciesParams{
		SpeciesID:  patientData.SpeciesID,
		LanguageID: commonData.Lang32(),
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	newSpeciesName, err := h.DB.Q.GetNameOfSpecies(ctx, sql.GetNameOfSpeciesParams{
		SpeciesID:  newSpeciesID,
		LanguageID: commonData.Lang32(),
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		if err := db.Q.SetPatientSpecies(ctx, sql.SetPatientSpeciesParams{
			ID:        patient,
			SpeciesID: newSpeciesID,
		}); err != nil {
			return err
		}

		if _, err := db.Q.AddPatientEvent(ctx, sql.AddPatientEventParams{
			PatientID: patient,
			HomeID:    patientData.CurrHomeID.Int32,
			EventID:   int32(model.EventIDSpeciesChanged),
			Note:      fmt.Sprintf("'%s' -> '%s'", prevSpeciesName, newSpeciesName),
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
