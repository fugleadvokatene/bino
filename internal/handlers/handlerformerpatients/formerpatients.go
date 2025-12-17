package handlerformerpatients

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type page struct {
	DB *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patients, err := h.DB.Q.GetFormerPatients(ctx, commonData.Lang32())
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	commonData.Subtitle = commonData.Language.FormerPatients

	FormerPatientsPage(commonData, generic.SliceToSlice(patients, func(in sql.GetFormerPatientsRow) model.Patient {
		return in.ToModel()
	})).Render(ctx, w)
}
