package handlerformerpatients

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/pagination"
	"github.com/fugleadvokatene/bino/internal/request"
)

type live struct {
	DB *db.Database
}

func (h *live) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	q, _ := request.GetQueryValue(r, "q")

	patients, n, err := h.DB.GetFormerPatients(ctx, data.Language, q, NFormerPatientsPerPage, 0)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	ps := pagination.New(0, n, NFormerPatientsPerPage, "/former-patients")
	FormerPatientsResults(data, patients, ps, q).Render(ctx, w)
}
