package handlerspeciesadmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerjson"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type postSpecies struct {
	DB *db.Database
}

func (h *postSpecies) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	type reqT struct {
		Latin     string
		Languages map[int32]string
	}
	handlerjson.Handler(h.DB, w, r, func(db *db.Database, req reqT) error {
		ctx := r.Context()
		id, err := db.Q.AddSpecies(ctx, req.Latin)
		if err != nil {
			return err
		}
		for langID, name := range req.Languages {
			if err := db.Q.UpsertSpeciesLanguage(ctx, sql.UpsertSpeciesLanguageParams{
				SpeciesID:  id,
				LanguageID: langID,
				Name:       name,
			}); err != nil {
				return err
			}
		}
		return nil
	})
}
