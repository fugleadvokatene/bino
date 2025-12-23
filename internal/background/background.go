package background

import (
	"context"
	"log/slog"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/security"
)

func RunJob[T any](what string, interval time.Duration, f func() (T, error)) {
	for {
		t0 := time.Now()
		slog.Info("Started background job", "what", what)
		result, err := f()
		elapsed := time.Since(t0)
		next := max(0, interval-elapsed)
		slog.Info("Completed background job", "what", what, "err", err, "result", result, "elapsed", elapsed.Round(time.Millisecond), "next", next.Round(time.Second))
		time.Sleep(next)
	}
}

func StartJobs(
	ctx context.Context,
	db *db.Database,
	fileBackend *fs.LocalFileStorage,
	systemLanguageID model.LanguageID,
	secConf *security.Config,
) {
	go RunJob("Delete stale sessions", time.Hour, func() (any, error) { return db.DeleteStaleSessions(ctx) })
	go RunJob("Delete expired invitations", time.Hour, func() (any, error) { return db.DeleteExpiredInvitations(ctx) })
	go RunJob("Delete old staged files", time.Hour, func() (any, error) { return fs.DeleteOldStagedFiles(ctx, fileBackend, 24*time.Hour) })
	go RunJob("Delete false Wiki links", time.Hour, func() (any, error) { return db.RemoveFalseFileWikiLinks(ctx) })
	go RunJob("Suggest journal URLs", time.Hour, func() (any, error) { return db.SuggestJournalURLs(ctx, systemLanguageID) })
	go RunJob("Unset old journal-pending status", time.Minute*10, func() (any, error) { return db.UnsetOldPendingStatus(ctx) })
	go RunJob("Create image variants", time.Minute*10, func() (any, error) { return CreateImageVariants(ctx, db, fileBackend) })
	if secConf.AllowUserDefinedHTTPRequests {
		go RunJob("Store user avatars", time.Hour, func() (any, error) { return db.StoreUserAvatars(ctx, fileBackend) })
	}
}
