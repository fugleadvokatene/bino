package handlerhomeadmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type setDivisionJournalFolder struct {
	DB *db.Database
	G  *gdrive.Worker
}

func (h *setDivisionJournalFolder) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	division, err := request.GetPathID(r, "division")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	newID, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	item, err := h.G.GetFile(newID)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	err = h.DB.Q.SetDivisionJournalFolder(ctx, sql.SetDivisionJournalFolderParams{
		ID:                division,
		JournalFolderID:   pgtype.Text{String: item.ID, Valid: true},
		JournalFolderName: pgtype.Text{String: item.Name, Valid: true},
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
