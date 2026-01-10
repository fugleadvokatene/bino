package handlerhomeadmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type setDivisionName struct {
	DB *db.Database
}

func (h *setDivisionName) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	division, err := request.GetPathID(r, "division")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	newName, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	err = h.DB.Q.SetDivisionName(ctx, sql.SetDivisionNameParams{
		ID:   division,
		Name: newName,
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
