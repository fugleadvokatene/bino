package handlerspeciesadmin

import (
	"context"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlercrud"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerjson"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type SpeciesGroupLangs struct {
	ID int32
	handlercrud.Names
}

// getSpeciesGroupLangs returns each group with its name in every language
func getSpeciesGroupLangs(ctx context.Context, db *db.Database) ([]SpeciesGroupLangs, error) {
	rows, err := db.Q.GetSpeciesGroups(ctx)
	if err != nil {
		return nil, err
	}

	langRows, err := db.Q.GetSpeciesGroupLanguage(ctx)
	if err != nil {
		return nil, err
	}

	groups := make([]SpeciesGroupLangs, len(rows))
	for i, row := range rows {
		groups[i] = SpeciesGroupLangs{ID: row, Names: map[int32]string{}}
	}
	for _, langRow := range langRows {
		for i := range groups {
			if groups[i].ID == langRow.GroupID {
				groups[i].Names[langRow.LanguageID] = langRow.Name
			}
		}
	}
	return groups, nil
}

type postSpeciesGroup struct {
	DB *db.Database
}

func (h *postSpeciesGroup) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	type reqT struct {
		Languages map[int32]string
	}
	handlerjson.Handler(h.DB, w, r, func(db *db.Database, req reqT) error {
		ctx := r.Context()
		id, err := db.Q.AddSpeciesGroup(ctx)
		if err != nil {
			return err
		}
		return upsertSpeciesGroupNames(r, db, id, req.Languages)
	})
}

type putSpeciesGroup struct {
	DB *db.Database
}

func (h *putSpeciesGroup) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	type reqT struct {
		ID        int32
		Languages map[int32]string
	}
	handlerjson.Handler(h.DB, w, r, func(db *db.Database, req reqT) error {
		return upsertSpeciesGroupNames(r, db, req.ID, req.Languages)
	})
}

func upsertSpeciesGroupNames(r *http.Request, db *db.Database, id int32, names map[int32]string) error {
	for langID, name := range names {
		if err := db.Q.UpsertSpeciesGroupLanguage(r.Context(), sql.UpsertSpeciesGroupLanguageParams{
			GroupID:    id,
			LanguageID: langID,
			Name:       name,
		}); err != nil {
			return err
		}
	}
	return nil
}
