package handlerspeciesadmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerjson"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type PutSpecies struct {
	DB *db.Database
}

func (h *PutSpecies) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	type reqT struct {
		ID        int32
		Latin     string
		Languages map[int32]string
	}
	handlerjson.Handler(h.DB, w, r, func(db *db.Database, req reqT) error {
		ctx := r.Context()
		for langID, name := range req.Languages {
			if err := db.Q.UpsertSpeciesLanguage(ctx, sql.UpsertSpeciesLanguageParams{
				SpeciesID:  req.ID,
				LanguageID: langID,
				Name:       name,
			}); err != nil {
				return err
			}
		}
		return nil
	})
}
