package handlerhome

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type setSetting struct {
	DB *db.Database
}

func (h *setSetting) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if err := request.ValidateCSRF(r); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	id, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	fields, err := request.GetFormValues(r, "key", "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.SetHomeSetting(ctx, sql.SetHomeSettingParams{
		HomeID: id,
		Key:    fields["key"],
		Value:  fields["value"],
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
