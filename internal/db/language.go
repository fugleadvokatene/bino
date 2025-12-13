package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func (db *Database) SetUserLanguage(ctx context.Context, userID int32, lang model.LanguageID) error {
	return db.Q.SetUserLanguage(ctx, sql.SetUserLanguageParams{
		AppuserID:  userID,
		LanguageID: int32(lang),
	})
}
