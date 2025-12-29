package db

import (
	"context"
	"fmt"
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
