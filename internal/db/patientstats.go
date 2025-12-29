package db

import (
	"context"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/model"
)

func (db *Database) GetCurrentSpeciesDistribution(ctx context.Context, lang model.LanguageID) ([]model.SpeciesCountRow, error) {
	dist, err := db.Q.StatPatientGetCurrentSpeciesDistribution(ctx, int32(lang))
	if err != nil {
		return nil, fmt.Errorf("querying db: %w", err)
	}
	return model.SliceToModel(dist), nil
}
