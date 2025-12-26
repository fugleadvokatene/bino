package background

import (
	"context"
	"time"

	dblib "github.com/fugleadvokatene/bino/internal/db"
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

	job.Run("Delete stale sessions", time.Hour, func() (any, error) { return db.DeleteStaleSessions(ctx) })
	job.Run("Delete expired invitations", time.Hour, func() (any, error) { return db.DeleteExpiredInvitations(ctx) })
	job.Run("Delete old staged files", time.Hour, func() (any, error) { return dblib.DeleteOldStagedFiles(ctx, db, 24*time.Hour) })
	job.Run("Delete false Wiki links", time.Hour, func() (any, error) { return db.RemoveFalseFileWikiLinks(ctx) })
	job.Run("Suggest journal URLs", time.Hour, func() (any, error) { return db.SuggestJournalURLs(ctx, systemLanguageID) })
	job.Run("Unset old journal-pending status", time.Minute*10, func() (any, error) { return db.UnsetOldPendingStatus(ctx) })

	jobs.ImageHint = job.Run("Create image variants and hashes", time.Minute*10, func() (any, error) {
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
	})

	if secConf.AllowUserDefinedHTTPRequests {
		job.Run("Store user avatars", time.Hour, func() (any, error) { return db.StoreUserAvatars(ctx) })
	}

	return jobs
}
