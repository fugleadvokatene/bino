package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func (db *Database) GetSpeciesForUser(ctx context.Context, user int32, languageID model.LanguageID) ([]model.Species, []model.Species, error) {
	preferredSpeciesRows, err := db.Q.GetPreferredSpeciesForHome(ctx, sql.GetPreferredSpeciesForHomeParams{
		HomeID:     user,
		LanguageID: int32(languageID),
	})
	if err != nil {
		return nil, nil, err
	}
	preferredSpecies := generic.SliceToSlice(preferredSpeciesRows, func(in sql.GetPreferredSpeciesForHomeRow) model.Species {
		return in.ToSpeciesView()
	})

	otherSpeciesRows, err := db.Q.GetSpeciesWithLanguage(ctx, int32(languageID))
	if err != nil {
		return nil, nil, err
	}
	otherSpecies := generic.SliceToSlice(generic.FilterSlice(otherSpeciesRows, func(in sql.GetSpeciesWithLanguageRow) bool {
		return generic.Find(preferredSpecies, func(preferred model.Species) bool {
			return preferred.ID == in.SpeciesID
		}) == -1
	}), func(in sql.GetSpeciesWithLanguageRow) model.Species {
		return in.ToSpeciesView(false)
	})
	return preferredSpecies, otherSpecies, nil
}
