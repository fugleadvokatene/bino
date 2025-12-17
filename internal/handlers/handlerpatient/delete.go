package handlerpatient

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type delete_ struct {
	DB *db.Database
}

func (h *delete_) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	cd := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.DeletePatient(ctx, patient); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	cd.Info(cd.Language.PatientWasDeleted)

	request.RedirectToReferer(w, r)
}
