package db

import (
	"context"
	"fmt"
	"time"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

func (db *Database) GetCurrentSpeciesDistribution(ctx context.Context, lang model.LanguageID) ([]model.SpeciesCountRow, error) {
	dist, err := db.Q.StatPatientGetCurrentSpeciesDistribution(ctx, int32(lang))
	if err != nil {
		return nil, fmt.Errorf("querying db: %w", err)
	}
	return model.SliceToModel(dist), nil
}

func (db *Database) GetSpeciesDistributionOverTime(ctx context.Context, from, to time.Time, lang model.LanguageID) ([]model.SpeciesDistributionSeries, error) {
	dist, err := db.Q.StatPatientGetSpeciesDistributionOverTime(ctx, sql.StatPatientGetSpeciesDistributionOverTimeParams{
		FirstDate:  pgtype.Date{Time: from, Valid: true},
		LastDate:   pgtype.Date{Time: to.AddDate(0, 0, 2), Valid: true},
		LanguageID: int32(lang),
	})
	if err != nil {
		return nil, fmt.Errorf("querying db: %w", err)
	}

	var out []model.SpeciesDistributionSeries
	for _, ptIn := range dist {
		ptOut := model.SpeciesDistributionPoint{
			Date:  ptIn.Date.Time,
			Count: int(ptIn.Count),
		}
		found := false
		for i, existing := range out {
			if existing.Name == ptIn.Name {
				out[i].Data = append(out[i].Data, ptOut)
				found = true
				break
			}
		}
		if found {
			break
		} else {
			out = append(out, model.SpeciesDistributionSeries{
				Name: ptIn.Name,
				Data: []model.SpeciesDistributionPoint{
					ptOut,
				},
			})
		}
	}
	return out, nil
}
