package handlerhome

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type deletePreferredSpecies struct {
	DB *db.Database
}

func (h *deletePreferredSpecies) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	species, err := request.GetPathID(r, "species")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.DeletePreferredSpecies(ctx, sql.DeletePreferredSpeciesParams{
		HomeID:    id,
		SpeciesID: species,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
