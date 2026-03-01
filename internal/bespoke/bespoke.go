package bespoke

import (
	"context"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/model"
)

type Bespoke interface {
	Name() string
	EditJournalOnEvent(ctx context.Context, patientID int32, eventID model.EventID, note string, t time.Time)
}

func NewBespoke(organization string, db *db.Database, gw *gdrive.Worker, lang model.LanguageID) Bespoke {
	if organization == "FugleAdvokatene" {
		return NewFugleAdvokatene(db, gw, lang)
	}
	return nil
}
