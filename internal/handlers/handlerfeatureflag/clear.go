package handlerfeatureflag

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/request"
)

type clear struct {
	db *db.Database
}

func (h *clear) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	flag, err := request.GetPathValue(r, "flag")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	user, err := request.GetPathID(r, "user")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if err := h.db.ClearFeatureFlagForUser(ctx, user, flag); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
