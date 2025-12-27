package handlergdriveadmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/request"
)

type setIndexerState struct {
	Worker *gdrive.Worker
	DB     *db.Database
}

func (h *setIndexerState) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	defer request.Redirect(w, r, "/gdrive")

	enabled := request.GetCheckboxValue(r, "enabled")

	maxPerRound, err := request.GetFormID(r, "max-per-round")
	if err != nil {
		commonData.Error("invalid max-per-round", err)
		return
	}

	minutesBetweenRounds, err := request.GetFormID(r, "minutes-between-rounds")
	if err != nil {
		commonData.Error("invalid minutes-between-rounds", err)
		return
	}

	if err := h.Worker.SetIndexerState(enabled, int(maxPerRound), int(minutesBetweenRounds)); err != nil {
		commonData.Error("setting indexer state", err)
		return
	}

	commonData.Success(commonData.Language.GenericSuccess)
}
