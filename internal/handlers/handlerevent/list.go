package handlerevent

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/pagination"
	"github.com/fugleadvokatene/bino/internal/request"
)

const NEventsPerPage = int32(100)

type list struct {
	DB *db.Database
}

func (h *list) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	offset, err := request.GetQueryID(r, "offset")
	if err != nil {
		offset = 0
	}

	events, n, err := h.DB.GetEvents(ctx, data.Language, NEventsPerPage, offset)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	ps := pagination.New(offset, n, NEventsPerPage, "/event")
	EventListPage(data, events, ps).Render(ctx, w)
}
