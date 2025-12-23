package handlerevent

import (
	"fmt"
	"net/http"

	"github.com/a-h/templ"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

const (
	NEventsPerPage = 100
)

type list struct {
	DB *db.Database
}

type listState struct {
	N     int32
	First int32
	Last  int32
}

func (ls *listState) Prev() (templ.SafeURL, bool) {
	if ls.First > 0 {
		return templ.URL(fmt.Sprintf("/event?offset=%d", min(0, ls.First-NEventsPerPage))), true
	}
	return "", false
}

func (ls *listState) Next() (templ.SafeURL, bool) {
	if ls.Last < ls.N {
		return templ.URL(fmt.Sprintf("/event?offset=%d", ls.Last+1)), true
	}
	return "", false
}

func (h *list) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	offset, err := request.GetQueryID(r, "offset")
	if err != nil {
		offset = 0
	}

	limit := int32(NEventsPerPage)

	events, n, err := h.DB.GetEvents(ctx, data.Language, limit, offset)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	first := offset
	last := offset + min(limit, n) - 1

	ls := listState{First: first, Last: last, N: n}

	EventListPage(data, events, ls).Render(ctx, w)
}
