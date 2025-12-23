package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func (db *Database) SetEventNote(ctx context.Context, eventID int32, note string) error {
	return db.Q.SetEventNote(ctx, sql.SetEventNoteParams{
		ID:   eventID,
		Note: note,
	})
}

func (db *Database) GetEvents(ctx context.Context, lang *language.Language, limit int32, offset int32) ([]model.Event, int32, error) {
	nEvents, err := db.Q.NumEvents(ctx)
	if err != nil {
		return nil, 0, err
	}

	events, err := db.Q.GetEvents(ctx, sql.GetEventsParams{Limit: limit, Offset: offset})
	if err != nil {
		return nil, 0, err
	}
	return generic.SliceToSlice(events, func(in sql.GetEventsRow) model.Event { return in.ToModel(lang) }), int32(nEvents), nil
}
