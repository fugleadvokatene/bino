package handlergdrivenotifications

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
)

type endpoint struct {
	Worker *gdrive.Worker
	DB     *db.Database
}

func (h *endpoint) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(200)

}
