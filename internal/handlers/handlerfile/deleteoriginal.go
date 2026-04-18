package handlerfile

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type deleteOriginal struct {
	DB *db.Database
}

func (h deleteOriginal) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathID(r, "id")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	file, err := h.DB.Q.GetFileByID(ctx, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	fileModel := file.ToModel()

	if fileModel.OriginalDeleted {
		http.Error(w, "original already deleted", http.StatusConflict)
		return
	}

	if _, err := h.DB.Q.GetVariant(ctx, sql.GetVariantParams{
		FileID:  id,
		Variant: model.FileVariantIDLarge.String(),
	}); err != nil {
		http.Error(w, "no Large variant exists", http.StatusPreconditionFailed)
		return
	}

	if err := h.DB.DeleteOriginalFile(ctx, fileModel.UUID, fileModel.OriginalFilename); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := h.DB.Q.SetOriginalDeleted(ctx, id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
