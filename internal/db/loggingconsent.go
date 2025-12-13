package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/sql"
)

func (db *Database) SetLoggingConsent(ctx context.Context, user int32, consented bool, duration int32) error {
	if consented {
		return db.Q.SetLoggingConsent(ctx, sql.SetLoggingConsentParams{
			ID:     user,
			Period: duration,
		})
	} else {
		return db.Q.RevokeLoggingConsent(ctx, user)
	}
}
