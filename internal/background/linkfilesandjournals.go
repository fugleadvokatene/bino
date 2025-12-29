package background

import (
	"context"
	"fmt"
	"log/slog"
	"time"

	dblib "github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive/document"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

func LinkFilesAndJournals(ctx context.Context, db *dblib.Database, lastSuccess time.Time) (int64, error) {
	journals, err := db.Q.GetJournalsUpdatedAfter(ctx, pgtype.Timestamptz{Time: lastSuccess, Valid: true})
	if err != nil {
		return 0, err
	}
	nUpdated := 0
	nFailed := 0
	for _, journal := range journals {
		doc, err := document.ParseJSON(journal.Json)
		if err != nil {
			slog.ErrorContext(ctx, "Corrupted document", "ID", journal.GoogleID, "er", err)
		}
		var fileIDs []int32
		for _, img := range doc.Images() {
			if fileID, ok := img.FileID(); ok {
				fileIDs = append(fileIDs, fileID)
			}
		}
		if err := db.Transaction(ctx, func(ctx context.Context, q *dblib.Database) error {
			if err := q.Q.DeleteFileJournalAssociations(ctx, journal.GoogleID); err != nil {
				return fmt.Errorf("deleting previous file/journal associations for: %w", err)
			}
			if err := q.Q.InsertFileJournalAssociations(ctx, sql.InsertFileJournalAssociationsParams{
				GoogleID: journal.GoogleID,
				FileID:   fileIDs,
			}); err != nil {
				return fmt.Errorf("inserting associations: %w", err)
			}
			return nil
		}); err != nil {
			slog.ErrorContext(ctx, "Updating file/journal associations", "err", err, "journal", journal.GoogleID, "files", fileIDs)
			nFailed++
		} else {
			nUpdated++
		}
	}
	if nFailed > 0 {
		err = fmt.Errorf("%d failed", nFailed)
	}
	return int64(nUpdated), err
}
