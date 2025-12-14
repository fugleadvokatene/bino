package handlerwiki

import (
	"io"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type save struct {
	DB *db.Database
}

func (h *save) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "id")
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}

	bytes, err := io.ReadAll(r.Body)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}

	if _, err := h.DB.Q.SaveWikiPage(ctx, sql.SaveWikiPageParams{
		PageID:  id,
		Content: bytes,
		Editor:  data.User.AppuserID,
	}); err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}
