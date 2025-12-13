package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/fugleadvokatene/bino/internal/enums"
)

func background(
	ctx context.Context,
	queries *Queries,
	fileBackend FileBackend,
	systemLanguageID enums.LanguageID,
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

		log.Printf("running background job: suggest journal URLs")
		if n, err := suggestJournalURLs(ctx, queries, systemLanguageID); err != nil {
			log.Printf("error suggesting journal URLs: %v", err)
		} else {
			log.Printf("suggested journal URLs (%d)", n)
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
				log.Printf("couldn't delete temp file %s: %v", uuid, result.Error)
			}
		}
	}

	return n, nil
}

func suggestJournalURLs(ctx context.Context, queries *Queries, systemLanguage enums.LanguageID) (int, error) {
	missing, err := queries.GetActivePatientsMissingJournal(ctx, int32(systemLanguage))
	if err != nil {
		return 0, fmt.Errorf("looking up patients: %w", err)
	}
	log.Printf("there are %d active patients missing journals", len(missing))

	n := 0
	for _, row := range missing {
		err := suggestJournalBasedOnSearch(ctx, queries, row.ID, row.Name, row.Species, row.CurrHomeID.Int32)
		if err != nil {
			log.Printf("couldn't suggest journal for %s: %v", row.Name, err)
			continue
		} else {
			n += 1
		}
	}
	return n, nil
}
