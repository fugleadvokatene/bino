package handlerevent

import (
	"context"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type SetNote struct {
	Backend interface {
		SetEventNote(ctx context.Context, ID int32, Note string) error
	}
}

func (h *SetNote) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	event, err := request.GetPathID(r, "event")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	note, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.Backend.SetEventNote(ctx, event, note); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
