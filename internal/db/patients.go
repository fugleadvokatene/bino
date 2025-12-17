package db

import (
	"context"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

func (db *Database) DeletePatient(ctx context.Context, id int32) error {
	return db.Transaction(ctx, func(ctx context.Context, q *Database) error {
		if err := db.Q.DeleteEventsForPatient(ctx, id); err != nil {
			return fmt.Errorf("deleting events for patient: %w", err)
		}
		if err := db.Q.DeleteSearchEntriesByNamespaceAndURL(ctx, sql.DeleteSearchEntriesByNamespaceAndURLParams{
			Namespace: "patient",
			Url:       pgtype.Text{String: model.PatientURL(id), Valid: true},
		}); err != nil {
			return fmt.Errorf("deleting search entries for patient: %w", err)
		}
		if err := db.Q.DeleteFileAssociationsForPatient(ctx, id); err != nil {
			return fmt.Errorf("deleting file associations for patient: %w", err)
		}
		if err := db.Q.DeletePatient(ctx, id); err != nil {
			return fmt.Errorf("deleting patient: %w", err)
		}
		return nil
	})
}
