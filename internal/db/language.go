package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

func (db *Database) SetUserLanguage(ctx context.Context, userID int32, lang model.LanguageID) error {
	return db.Q.SetUserLanguage(ctx, sql.SetUserLanguageParams{
		ID:         userID,
		LanguageID: pgtype.Int4{Int32: int32(lang), Valid: true},
	})
}
