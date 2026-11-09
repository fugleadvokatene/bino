package handlercheckinfield

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type page struct {
	DB *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	commonData.Subtitle = commonData.Language.CheckinFields

	fields, err := h.DB.GetCheckinFields(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	_ = CheckinFieldsPage(commonData, fields).Render(ctx, w)
}
