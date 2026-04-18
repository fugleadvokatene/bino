package handlertasktemplate

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
	commonData.Subtitle = commonData.Language.TasksTemplates

	templates, err := h.DB.Q.GetScheduleTemplates(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	TemplatesPage(commonData, templates).Render(ctx, w)
}
