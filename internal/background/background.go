package background

import (
	"context"
	"log"
	"time"

	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/model"
)

func RunJob[T any](what string, interval time.Duration, f func() (T, error)) {
	for {
		t0 := time.Now()
		log.Printf("[Background job '%s'] Started", what)
		result, err := f()
		elapsed := time.Since(t0)
		next := max(0, interval-elapsed)
		log.Printf("[Background job '%s'] Completed in %v, err=%v, result=%v, next=%v", what, elapsed.Round(time.Millisecond), err, result, next.Round(time.Second))
		time.Sleep(next)
	}
}

type Backend interface {
	DeleteStaleSessions(ctx context.Context) (int64, error)
	DeleteExpiredInvitations(ctx context.Context) (int64, error)
	RemoveFalseFileWikiLinks(ctx context.Context) (int64, error)
	SuggestJournalURLs(ctx context.Context, languageID model.LanguageID) (int64, error)
}

func StartJobs(
	ctx context.Context,
	backend Backend,
	fileBackend fs.FileStorage,
	systemLanguageID model.LanguageID,
) {
	go RunJob("Delete stale sessions", time.Hour, func() (any, error) { return backend.DeleteStaleSessions(ctx) })
	go RunJob("Delete expired invitations", time.Hour, func() (any, error) { return backend.DeleteExpiredInvitations(ctx) })
	go RunJob("Delete old staged files", time.Hour, func() (any, error) { return fs.DeleteOldStagedFiles(ctx, fileBackend, 24*time.Hour) })
	go RunJob("Delete false Wiki links", time.Hour, func() (any, error) { return backend.RemoveFalseFileWikiLinks(ctx) })
	go RunJob("Suggest journal URLs", time.Hour, func() (any, error) { return backend.SuggestJournalURLs(ctx, systemLanguageID) })
}
