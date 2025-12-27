package handlerpatient

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/config"
	dblib "github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type fetchJournal struct {
	DB           *dblib.Database
	GDriveWorker *gdrive.Worker
	Config       *config.Config
}

func (h *fetchJournal) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patientData, err := h.DB.Q.GetPatient(ctx, patient)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	googleID := patientData.GoogleID
	if !googleID.Valid || googleID.String == "" {
		handlererror.Error(w, r, err)
		return
	}
	go h.GDriveWorker.FetchJournal(googleID.String)

	commonData.Success(commonData.Language.TODO("Journalen innhentes, oppdater siden om noen sekunder"))
	request.RedirectToReferer(w, r)
}
