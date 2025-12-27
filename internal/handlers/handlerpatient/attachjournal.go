package handlerpatient

import (
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

type attachJournal struct {
	DB *db.Database
}

func (h *attachJournal) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	urlValue, err := request.GetFormValue(r, "url")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	matches := url.DocumentIDRegex.FindStringSubmatch(urlValue)
	if len(matches) < 2 {
		commonData.Error(commonData.Language.TODO("bad URL"), err)
		request.RedirectToReferer(w, r)
		return
	}
	googleID := matches[1]

	patientData, err := h.DB.Q.GetPatient(ctx, patient)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if tag, err := h.DB.Q.SetPatientJournal(ctx, sql.SetPatientJournalParams{
		ID: patient,
		GoogleID: pgtype.Text{
			String: googleID,
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
		EventID:   int32(model.EventIDJournalAttached),
		AppuserID: commonData.User.AppuserID,
		Time:      pgtype.Timestamptz{Time: time.Now(), Valid: true},
	}); err != nil {
		commonData.Warning(commonData.Language.TODO("failed to create event"), err)
	}

	commonData.Success(commonData.Language.TODO("journal attached"))
	request.RedirectToReferer(w, r)
}
