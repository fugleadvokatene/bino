package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/sql"
)

func (db *Database) SetEventNote(ctx context.Context, eventID int32, note string) error {
	return db.Q.SetEventNote(ctx, sql.SetEventNoteParams{
		ID:   eventID,
		Note: note,
	})
}
