package main

import (
	"context"
	"log"
	"time"
)

func backgroundDeleteExpiredItems(
	ctx context.Context,
	queries *Queries,
	fileBackend FileBackend,
) {
	for {
		log.Printf("running background job: delete expired sessions")
		if result, err := queries.DeleteStaleSessions(ctx); err != nil {
			log.Printf("error deleting stale sessions: %v", err)
		} else {
			log.Printf("deleted stale sessions (%d)", result.RowsAffected())
		}

		log.Printf("running background job: delete expired invitations")
		if result, err := queries.DeleteExpiredInvitations(ctx); err != nil {
			log.Printf("error deleting expired invitations: %v", err)
		} else {
			log.Printf("deleted expired invitations (%d)", result.RowsAffected())
		}

		log.Printf("running background job: delete old staged files")
		if n, err := deleteOldStagedFiles(ctx, fileBackend); err != nil {
			log.Printf("error deleting old staged files: %v", err)
		} else {
			log.Printf("deleted old staged files (%d)", n)
		}

		log.Printf("running background job: remove false wiki file associations")
		if tag, err := queries.RemoveFalseFileWikiLinks(ctx); err != nil {
			log.Printf("error removing false wiki file associations: %v", err)
		} else {
			log.Printf("removed false wiki file associations (%d)", tag.RowsAffected())
		}

		time.Sleep(time.Hour)
	}
}

func deleteOldStagedFiles(ctx context.Context, fileBackend FileBackend) (int, error) {
	tempFiles := fileBackend.ListTemp(ctx)
	if tempFiles.Error != nil {
		return 0, tempFiles.Error
	}

	n := 0
	for uuid, info := range tempFiles.Files {
		if time.Since(info.Created) > 24*time.Hour {
			if result := fileBackend.DeleteTemp(ctx, uuid); result.Error == nil {
				n += 1
			} else {
				log.Printf("couldn't delete temp file %s: %w", uuid, result.Error)
			}
		}
	}

	return n, nil
}
