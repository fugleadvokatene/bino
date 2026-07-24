package db

import (
	"context"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/sql"
)

// SetUserDeactivated marks the user as deactivated or reactivated, preventing
// (or re-allowing) login. Deactivating a user also kills their active sessions
// so the change takes effect immediately.
func (db *Database) SetUserDeactivated(ctx context.Context, id int32, deactivated bool) error {
	return db.Transaction(ctx, func(ctx context.Context, db *Database) error {
		if err := db.Q.SetUserDeactivated(ctx, sql.SetUserDeactivatedParams{
			ID:          id,
			Deactivated: deactivated,
		}); err != nil {
			return fmt.Errorf("setting deactivated status: %w", err)
		}
		if deactivated {
			if err := db.Q.DeleteSessionsForUser(ctx, id); err != nil {
				return fmt.Errorf("deleting sessions: %w", err)
			}
		}
		return nil
	})
}
