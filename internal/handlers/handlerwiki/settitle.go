package handlerwiki

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type SetTitle struct {
	DB *db.Database
}

func (h *SetTitle) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathID(r, "id")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	title, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.SetWikiPageTitle(ctx, sql.SetWikiPageTitleParams{
		ID:    id,
		Title: title,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.Redirect(w, r, fmt.Sprintf("/wiki/view/%d", id))
}
