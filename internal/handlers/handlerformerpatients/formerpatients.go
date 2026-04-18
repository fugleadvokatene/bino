package handlerformerpatients

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/pagination"
	"github.com/fugleadvokatene/bino/internal/request"
)

const NFormerPatientsPerPage = int32(50)

type page struct {
	DB *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	commonData.Subtitle = commonData.Language.FormerPatients

	q, _ := request.GetQueryValue(r, "q")

	offset, err := request.GetQueryID(r, "offset")
	if err != nil || q != "" {
		offset = 0
	}

	patients, n, err := h.DB.GetFormerPatients(ctx, commonData.Language, q, NFormerPatientsPerPage, offset)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	ps := pagination.New(offset, n, NFormerPatientsPerPage, "/former-patients")
	FormerPatientsPage(commonData, patients, ps, q).Render(ctx, w)
}
