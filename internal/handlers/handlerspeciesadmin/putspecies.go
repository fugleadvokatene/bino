package handlerspeciesadmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerjson"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type putSpecies struct {
	DB *db.Database
}

func (h *putSpecies) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	type reqT struct {
		ID        int32
		Latin     string
		GroupID   int32
		Languages map[int32]string
	}
	handlerjson.Handler(h.DB, w, r, func(db *db.Database, req reqT) error {
		ctx := r.Context()
		if err := db.Q.SetSpeciesScientificName(ctx, sql.SetSpeciesScientificNameParams{
			ID:             req.ID,
			ScientificName: req.Latin,
		}); err != nil {
			return err
		}
		if err := db.Q.SetSpeciesGroup(ctx, sql.SetSpeciesGroupParams{
			ID:      req.ID,
			GroupID: pgtype.Int4{Int32: req.GroupID, Valid: req.GroupID != 0},
		}); err != nil {
			return err
		}
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
