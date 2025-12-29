package background

import (
	"context"
	"time"

	dblib "github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/debug"
	"github.com/fugleadvokatene/bino/internal/job"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/security"
)

type Jobs struct {
	ImageHint job.Hint
}

func StartJobs(
	ctx context.Context,
	db *dblib.Database,
	systemLanguageID model.LanguageID,
	secConf *security.Config,
) Jobs {
	var jobs Jobs

	job.Run(
		ctx,
		db,
		"Delete stale sessions",
		time.Hour,
		func(ctx context.Context, lastSuccess time.Time) (any, error) {
			return db.DeleteStaleSessions(ctx)
		},
	)
	job.Run(
		ctx,
		db,
		"Delete expired invitations",
		time.Hour,
		func(ctx context.Context, _ time.Time) (any, error) {
			return db.DeleteExpiredInvitations(ctx)
		},
	)
	job.Run(
		ctx,
		db,
		"Delete old staged files",
		time.Hour,
		func(ctx context.Context, _ time.Time) (any, error) {
			return dblib.DeleteOldStagedFiles(ctx, db, 6*time.Hour)
		},
	)
	job.Run(
		ctx,
		db,
		"Delete false Wiki links",
		time.Hour,
		func(ctx context.Context, _ time.Time) (any, error) {
			return db.RemoveFalseFileWikiLinks(ctx)
		},
	)
	job.Run(
		ctx,
		db,
		"Suggest journal URLs",
		time.Hour,
		func(ctx context.Context, _ time.Time) (any, error) {
			return db.SuggestJournalURLs(ctx, systemLanguageID)
		},
	)
	job.Run(
		ctx,
		db,
		"Unset old journal-pending status",
		time.Minute*10,
		func(ctx context.Context, lastSuccess time.Time) (any, error) {
			return db.UnsetOldPendingStatus(ctx)
		},
	)
	job.Run(
		ctx,
		db,
		"Collect stats",
		time.Minute,
		func(ctx context.Context, _ time.Time) (any, error) {
			return debug.StoreDebugStats(ctx, db)
		},
	)
	job.Run(
		ctx,
		db,
		"Link files and journals",
		time.Minute*10,
		func(ctx context.Context, lastSuccess time.Time) (any, error) {
			return LinkFilesAndJournals(ctx, db, lastSuccess)
		},
	)

	jobs.ImageHint = job.Run(
		ctx,
		db,
		"Create image variants and hashes",
		time.Minute*10,
		func(ctx context.Context, _ time.Time) (any, error) {
			// Create image variants before hashes so that the new variants are ready to be hashed
			nVariants, err := CreateImageVariants(ctx, db)
			if err != nil {
				return nVariants, err
			}
			nHashes, err := CreateImageHashes(ctx, db)
			if err != nil {
				return nVariants + nHashes, err
			}
			return nVariants + nHashes, nil
		},
	)

	if secConf.AllowUserDefinedHTTPRequests {
		job.Run(
			ctx,
			db,
			"Store user avatars",
			time.Hour,
			func(ctx context.Context, _ time.Time) (any, error) {
				return db.StoreUserAvatars(ctx)
			},
		)
	}

	return jobs
}
