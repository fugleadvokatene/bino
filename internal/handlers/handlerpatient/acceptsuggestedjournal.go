package handlerpatient

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type acceptSuggestedJournal struct {
	DB *db.Database
}

func (h *acceptSuggestedJournal) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	if err := h.DB.Q.AcceptSuggestedJournal(ctx, patient); err != nil {
		commonData.Warning(commonData.Language.TODO("failed to accept suggested journal"), err)
	}
	request.RedirectToReferer(w, r)
}
