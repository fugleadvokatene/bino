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
		"Delete stale sessions",
		time.Hour,
		db.DeleteStaleSessions,
	)
	job.Run(
		ctx,
		"Delete expired invitations",
		time.Hour,
		db.DeleteExpiredInvitations,
	)
	job.Run(
		ctx,
		"Delete old staged files",
		time.Hour,
		func(ctx context.Context) (any, error) {
			return dblib.DeleteOldStagedFiles(ctx, db, 24*time.Hour)
		},
	)
	job.Run(
		ctx,
		"Delete false Wiki links",
		time.Hour,
		db.RemoveFalseFileWikiLinks,
	)
	job.Run(
		ctx,
		"Suggest journal URLs",
		time.Hour,
		func(ctx context.Context) (any, error) {
			return db.SuggestJournalURLs(ctx, systemLanguageID)
		},
	)
	job.Run(
		ctx,
		"Unset old journal-pending status",
		time.Minute*10,
		db.UnsetOldPendingStatus,
	)
	job.Run(
		ctx,
		"Collect stats",
		time.Minute,
		func(ctx context.Context) (any, error) {
			return debug.StoreDebugStats(ctx, db)
		},
	)

	jobs.ImageHint = job.Run(
		ctx,
		"Create image variants and hashes",
		time.Minute*10,
		func(ctx context.Context) (any, error) {
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
			"Store user avatars",
			time.Hour,
			db.StoreUserAvatars,
		)
	}

	return jobs
}
