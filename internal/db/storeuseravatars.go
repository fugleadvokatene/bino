package db

import (
	"context"
	"errors"
	"log/slog"

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

	// Upload images, keeping track of the mapping from id to user id
	commitResults := make(map[int32]model.FileInfo)
	fileIDToUserID := make(map[int32]int32)
	for _, user := range users {
		fileInfo, id, err := UploadImageFromURL(ctx, user.AvatarUrl.String, db)
		if err != nil {
			slog.Warn("Unable to upload image", "err", err, "url", user.AvatarUrl.String)
			continue
		}
		if id == 0 {
			slog.Warn("Got empty UUID after upload")
			continue
		}
		slog.Info("Uploaded image", "id", id, "originalURL", user.AvatarUrl.String)
		commitResults[id] = fileInfo
		fileIDToUserID[id] = user.ID
	}

	// Register images to publish them
	if err := db.Transaction(ctx, func(ctx context.Context, db *Database) error {
		errs := []error{}
		for fileID, fileInfo := range commitResults {
			userID, found := fileIDToUserID[fileID]
			if !found {
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
