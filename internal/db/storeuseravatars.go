package db

import (
	"context"
	"errors"
	"log/slog"
	"time"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

func (db *Database) StoreUserAvatars(ctx context.Context) (int64, error) {
	// Get users that currently have their avatar stored on googleusercontent.com, these may disappear at any time
	users, err := db.Q.GetUsersWithGoogleStoredAvatars(ctx)
	if err != nil || len(users) == 0 {
		return 0, err
	}

	// Upload images, keeping track of the mapping from uuid to user id
	fileIDToUserID := make(map[string]int32)
	for _, user := range users {
		uuid, err := UploadImageFromURL(ctx, user.AvatarUrl.String, db, user.ID)
		if err != nil {
			slog.Warn("Unable to upload image", "err", err, "url", user.AvatarUrl.String)
			continue
		}
		if uuid == "" {
			slog.Warn("Got empty UUID after upload")
			continue
		}
		slog.Info("Uploaded image", "uuid", uuid, "originalURL", user.AvatarUrl.String)
		fileIDToUserID[uuid] = user.ID
	}

	// Commit images
	commitResults := make(map[string]model.FileInfo)
	for uuid := range fileIDToUserID {
		result, err := db.CommitFile(ctx, uuid)
		if err == nil {
			commitResults[uuid] = result
		} else {
			slog.Error("Committing file", "uuid", uuid, "err", err)
		}
	}

	// Register images to publish them
	if err := db.Transaction(ctx, func(ctx context.Context, db *Database) error {
		errs := []error{}
		for uuid, fileInfo := range commitResults {
			userID, found := fileIDToUserID[uuid]
			if !found {
				continue
			}
			fileID, err := db.Q.PublishFile(ctx, sql.PublishFileParams{
				Uuid:          uuid,
				Creator:       fileInfo.Creator,
				Created:       pgtype.Timestamptz{Time: time.Now(), Valid: true},
				Accessibility: int32(model.FileAccessibilityInternal),
				Filename:      fileInfo.FileName,
				Mimetype:      fileInfo.MIMEType,
				Size:          fileInfo.Size,
			})
			if err != nil {
				slog.Warn("Unable to commit image", "err", err)
				continue
			}
			if err := db.Q.UpdateUserAvatar(ctx, sql.UpdateUserAvatarParams{
				Url: pgtype.Text{String: model.FileURL(fileID, fileInfo.FileName), Valid: true},
				ID:  userID,
			}); err != nil {
				slog.Warn("Unable to update user avatar", "err", err)
				continue
			}
		}
		return errors.Join(errs...)
	}); err != nil {
		slog.Warn("Errors registering files", "err", err)
	}
	return int64(len(commitResults)), err
}
