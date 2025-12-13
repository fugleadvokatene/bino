package handlerjson

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/request"
)

func Handler[T any](
	db *db.Database,
	w http.ResponseWriter,
	r *http.Request,
	f func(db *db.Database, req T) error,
) {
	bytes, err := io.ReadAll(r.Body)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}
	var recv T
	if err := json.Unmarshal(bytes, &recv); err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}
	if err := f(db, recv); err != nil {
		request.AjaxError(w, r, err, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
