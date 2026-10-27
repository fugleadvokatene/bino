package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/stats"
)

func (db *Database) GetStays(ctx context.Context) ([]stats.Stay, error) {
	rows, err := db.Q.GetLifecycleEventsForStats(ctx, stats.LifecycleEventIDs())
	if err != nil {
		return nil, err
	}
	events := make([]stats.Event, len(rows))
	for i, row := range rows {
		events[i] = stats.Event{
			PatientID: row.PatientID,
			SpeciesID: row.SpeciesID,
			HomeID:    row.HomeID,
			EventID:   model.EventID(row.EventID),
			Status:    model.Status(row.Status.Int32),
			Time:      row.Time.Time,
		}
	}
	return stats.BuildStays(events), nil
}
