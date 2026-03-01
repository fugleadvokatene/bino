package handlersyslog

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

const entriesPerPage = 50

type page struct {
	DB *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	offset, err := request.GetPathID(r, "offset")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	rows, err := h.DB.SysLogGet(ctx, entriesPerPage, offset)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	havePrev := offset > 0
	haveNext := len(rows) == entriesPerPage // yes there is an edge case here at the very end where we incorrectly return true if the total number of logs is a multiple of entriesPerPage. whatever
	var prevOffset, nextOffset int32
	if offset <= entriesPerPage {
		prevOffset = 0
	}
	nextOffset = offset + entriesPerPage

	SyslogPage(commonData, rows, havePrev, haveNext, prevOffset, nextOffset).Render(ctx, w)
}
