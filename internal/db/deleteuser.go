package db

import (
	"context"
	"fmt"
)

func (db *Database) DeleteUser(ctx context.Context, id int32) error {
	return db.Transaction(ctx, func(ctx context.Context, db *Database) error {
		if err := db.Q.RemoveHomesForAppuser(ctx, id); err != nil {
			return fmt.Errorf("removing homes: %w", err)
		}
		if err := db.Q.DeleteSessionsForUser(ctx, id); err != nil {
			return fmt.Errorf("deleting sessions: %w", err)
		}
		if err := db.Q.ScrubAppuser(ctx, id); err != nil {
			return fmt.Errorf("scrubbing user: %w", err)
		}
		return nil
	})
}
