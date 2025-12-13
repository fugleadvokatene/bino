package handlerhomeadmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type SetName struct {
	DB *db.Database
}

func (h *SetName) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	home, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	newName, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	err = h.DB.Q.UpdateHomeName(ctx, sql.UpdateHomeNameParams{
		ID:   home,
		Name: newName,
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
