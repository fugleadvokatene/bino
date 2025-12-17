package handlerhomeadmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type setName struct {
	DB *db.Database
}

func (h *setName) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cd := request.MustLoadCommonData(ctx)

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

	cd.Info(cd.Language.HomeNameWasUpdated)

	request.RedirectToReferer(w, r)
}
