package gdrive

import (
	"context"
	"errors"
	"fmt"
	"log"
	"log/slog"
	"time"

	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type IndexerState struct {
	Enabled                     bool
	MaxDocumentsCreatedPerRound int
	Interval                    time.Duration
}

func (w *Worker) searchIndexWorker(ctx context.Context) {
	for {
		var n int
		if w.indexerState.Enabled {
			n = w.searchIndexAll(ctx)
		}

		sleepTime := w.indexerState.Interval
		if sleepTime < time.Second {
			sleepTime = time.Second
		}

		if w.indexerState.Enabled {
			slog.InfoContext(ctx, "Indexer done", "n created", n, "time to next", sleepTime)
		}

		time.Sleep(sleepTime)
	}
}

func (w *Worker) searchIndexAll(ctx context.Context) int {
	created := 0
	w.searchIndexFolder(ctx, w.cfg.JournalFolder, &created)
	if created >= w.indexerState.MaxDocumentsCreatedPerRound {
		return created
	}
	for _, folder := range w.cfg.ExtraJournalFolders {
		w.searchIndexFolder(ctx, folder, &created)
		if created >= w.indexerState.MaxDocumentsCreatedPerRound {
			return created
		}
	}
	return created
}

func (w *Worker) listFiles(ctx context.Context, folderID string, pageToken string) (ListFilesResult, error) {
	res, err := w.ListFiles(ListFilesParams{
		Parent:    folderID,
		PageToken: pageToken,
	})
	if err != nil {
		return ListFilesResult{}, err
	}
	return ListFilesResult{
		Files:         res.Files,
		Folder:        res.Folder,
		NextPageToken: res.NextPageToken,
	}, nil
}

func (w *Worker) searchIndexFolder(ctx context.Context, folderID string, created *int) {
	pageToken := ""
	first := true
	for {
		res, err := w.listFiles(ctx, folderID, pageToken)
		if err != nil {
			slog.Warn("Error listing files", "err", err)
			return
		}

		if first {
			if err := w.g.DB.Q.SaveGoogleFolder(ctx, sql.SaveGoogleFolderParams{
				GoogleID: folderID,
				Name:     res.Folder.Name,
			}); err != nil {
				slog.Warn("Couldn't save google folder", "name", res.Folder.Name)
			}
			first = false
		}

		for _, file := range res.Files {
			if didCreate, err := w.searchIndexFile(ctx, res.Folder, file); err != nil {
				slog.Warn("Error converting file", "name", file.Name, "err", err)
			} else if didCreate {
				*created++
				slog.InfoContext(ctx, "Journal created", "title", file.Name, "created this round", *created)
				if *created > w.indexerState.MaxDocumentsCreatedPerRound {
					return
				}
			}
		}

		if res.NextPageToken == "" {
			break
		}
		pageToken = res.NextPageToken
	}
}

func (w *Worker) searchIndexFile(ctx context.Context, folder, file Item) (bool, error) {
	// Get updated-time
	var updated pgtype.Timestamptz
	if meta, err := w.g.DB.Q.GetJournalMetadata(ctx, file.ID); err == nil {
		updated = meta.Updated
		if !meta.ParentGoogleID.Valid {
			w.g.DB.Q.SetGoogleParentFolder(ctx, sql.SetGoogleParentFolderParams{
				GoogleID:       file.ID,
				ParentGoogleID: pgtype.Text{String: folder.ID, Valid: true},
			})
		}
	} else if !errors.Is(err, pgx.ErrNoRows) {
		log.Printf("Getting update time for %s: %v", file.Name, err)
	}

	// Delete trashed files
	if file.Trashed {
		if updated.Valid {
			if err := w.g.DB.Q.DeleteJournal(ctx, file.ID); err != nil {
				return false, fmt.Errorf("deleting search query: %w", err)
			}
		}
		return false, nil
	}

	// If search-entry is synced, don't do anything
	if updated.Valid && !file.ModifiedTime.After(updated.Time) {
		return false, nil
	}

	go func() {
		if err := w.FetchJournal(file.ID, &ParentInfo{ID: folder.ID, Name: folder.Name}); err != nil {
			slog.ErrorContext(ctx, "Error fetching journal", "err", err, "name", file.Name)
		}
	}()
	return true, nil
}
