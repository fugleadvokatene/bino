package handlerpatient

import (
	"context"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type suggestedJournalAction struct {
	DB     *db.Database
	action func(context.Context, int32) error
	errMsg string
}

func (h *suggestedJournalAction) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	if err := h.action(ctx, patient); err != nil {
		commonData.Warning(commonData.Language.TODO(h.errMsg), err)
	} else {
		commonData.Info(commonData.Language.GenericSuccess)
	}
	request.RedirectToReferer(w, r)
}
