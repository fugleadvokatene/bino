package db

import (
	"context"
	"fmt"
)

// Delete not only the information associated with the user, but any evidence that the user ever existed
func (db *Database) NukeUser(ctx context.Context, id int32) error {
	if err := db.DeleteUser(ctx, id); err != nil {
		return fmt.Errorf("deleting user: %w", err)
	}
	return db.Transaction(ctx, func(ctx context.Context, db *Database) error {
		if err := db.Q.DeleteEventsCreatedByUser(ctx, id); err != nil {
			return fmt.Errorf("deleting events created by user: %w", err)
		}
		if err := db.Q.DeleteAppuserLanguage(ctx, id); err != nil {
			return fmt.Errorf("deleting appuser language: %w", err)
		}
		if err := db.Q.DeleteAppuser(ctx, id); err != nil {
			return fmt.Errorf("deleting appuser: %w", err)
		}
		return nil
	})
}
