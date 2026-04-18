package db

import (
	"context"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func (db *Database) DeletePatient(ctx context.Context, id int32) error {
	return db.Transaction(ctx, func(ctx context.Context, q *Database) error {
		if err := db.Q.DeleteEventsForPatient(ctx, id); err != nil {
			return fmt.Errorf("deleting events for patient: %w", err)
		}
		if err := db.Q.DeletePatient(ctx, id); err != nil {
			return fmt.Errorf("deleting patient: %w", err)
		}
		return nil
	})
}

func (db *Database) GetFormerPatients(ctx context.Context, lang *language.Language, q string, limit, offset int32) ([]model.Patient, int32, error) {
	n, err := db.Q.NumFormerPatients(ctx, sql.NumFormerPatientsParams{
		LanguageID: int32(lang.ID),
		Column2:    q,
	})
	if err != nil {
		return nil, 0, err
	}
	rows, err := db.Q.GetFormerPatients(ctx, sql.GetFormerPatientsParams{
		LanguageID: int32(lang.ID),
		Column2:    q,
		Limit:      limit,
		Offset:     offset,
	})
	if err != nil {
		return nil, 0, err
	}
	return generic.SliceToSlice(rows, func(in sql.GetFormerPatientsRow) model.Patient { return in.ToModel() }), int32(n), nil
}
