package main

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerjson"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type SpeciesLangs struct {
	ID        int32
	LatinName string
	Names
}

func (server *Server) postSpeciesHandler(w http.ResponseWriter, r *http.Request) {
	type reqT struct {
		Latin     string
		Languages map[int32]string
	}
	handlerjson.Handler(server.DB, w, r, func(db *db.Database, req reqT) error {
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

func (server *Server) putSpeciesHandler(w http.ResponseWriter, r *http.Request) {
	type reqT struct {
		ID        int32
		Latin     string
		Languages map[int32]string
	}
	handlerjson.Handler(server.DB, w, r, func(db *db.Database, req reqT) error {
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

func (server *Server) getSpeciesHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	rows, err := server.DB.Q.GetSpecies(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	langRows, err := server.DB.Q.GetSpeciesLanguage(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	speciesView := make([]SpeciesLangs, 0, len(rows))
	iLangRows := 0
	for _, row := range rows {
		species := SpeciesLangs{
			ID:        row.ID,
			LatinName: row.ScientificName,
			Names:     map[int32]string{},
		}
		for {
			if iLangRows >= len(langRows) {
				break
			}
			langRow := langRows[iLangRows]
			if langRow.SpeciesID == row.ID {
				species.Names[langRow.LanguageID] = langRow.Name
				iLangRows++
			} else {
				break
			}
		}

		speciesView = append(speciesView, species)
	}

	_ = SpeciesPage(commonData, speciesView).Render(ctx, w)
}
