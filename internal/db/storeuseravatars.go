package db

import (
	"bytes"
	"context"
	"crypto/sha256"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/url"
	"path"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/security"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

func (db *Database) StoreUserAvatars(ctx context.Context, backend *fs.LocalFileStorage) (int64, error) {
	// Get users that currently have their avatar stored on googleusercontent.com, these may disappear at any time
	users, err := db.Q.GetUsersWithGoogleStoredAvatars(ctx)
	if err != nil {
		return 0, err
	}

	type avatarUpload struct {
		UserID int32
		Hash   []byte
	}

	// Upload images, keeping track of the mapping from uuid to user id
	fileIDToUserID := make(map[string]avatarUpload)
	for _, user := range users {
		reader, fetchInfo, err := security.Fetch(ctx, user.AvatarUrl.String, func(ct string) error {
			if !strings.HasPrefix(ct, "image/") {
				return fmt.Errorf("not an image: %s", ct)
			}
			return nil
		})
		if err != nil {
			slog.Warn("Unable to fetch image", "err", err, "url", user.AvatarUrl.String)
			continue
		}
		data, err := io.ReadAll(reader)
		if err != nil {
			slog.Warn("Unable to read image", "err", err, "url", user.AvatarUrl.String)
			continue
		}

		hashSum := sha256.Sum256(data)
		hash := hashSum[:]
		size := int64(len(data))
		existing, err := db.Q.GetFileBySizeAndHash(ctx, sql.GetFileBySizeAndHashParams{
			Size:   size,
			Sha256: hash,
		})
		if err == nil {
			if err := db.Q.UpdateUserAvatar(ctx, sql.UpdateUserAvatarParams{
				Url: pgtype.Text{String: model.FileURL(existing.ID, existing.PresentationFilename), Valid: true},
				ID:  user.ID,
			}); err != nil {
				slog.Warn("Unable to update user avatar to existing image", "err", err)
			}
			continue
		}
		if !errors.Is(err, pgx.ErrNoRows) {
			slog.Warn("Unable to lookup existing image", "err", err, "url", user.AvatarUrl.String)
			continue
		}

		name := "file.img"
		if u, err := url.Parse(user.AvatarUrl.String); err == nil {
			nameFromURL := security.SanitizeFilename(path.Base(u.Path), fetchInfo.ContentType)
			if nameFromURL != "" && nameFromURL != "/" {
				name = nameFromURL
			}
		}

		info := model.FileInfo{
			FileName: name,
			MIMEType: fetchInfo.ContentType,
			Size:     size,
			Created:  time.Now(),
			Creator:  user.ID,
		}

		uploadResult := backend.Upload(ctx, bytes.NewReader(data), info)
		if err := uploadResult.Error; err != nil {
			slog.Warn("Unable to upload image", "err", err, "url", user.AvatarUrl.String)
			continue
		}
		if uploadResult.UniqueID == "" {
			slog.Warn("Got empty UUID after upload")
			continue
		}
		slog.Info("Uploaded image", "uuid", uploadResult.UniqueID, "originalURL", user.AvatarUrl.String)
		fileIDToUserID[uploadResult.UniqueID] = avatarUpload{
			UserID: user.ID,
			Hash:   hash,
		}
	}

	// Commit images
	uuids := generic.MapToSlice(fileIDToUserID, func(uuid string, _ avatarUpload) string { return uuid })
	commitResult := backend.Commit(ctx, uuids)
	if err := commitResult.Error; err != nil {
		slog.Warn("Unable to commit image", "err", err, "n committed", len(commitResult.Commited), "n failed", len(commitResult.Failed))
	}

	// Register images to publish them
	if err := db.Transaction(ctx, func(ctx context.Context, db *Database) error {
		errs := []error{}
		for uuid, fileInfo := range commitResult.Commited {
			upload, found := fileIDToUserID[uuid]
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
				Sha256:        upload.Hash,
			})
			if err != nil {
				slog.Warn("Unable to commit image", "err", err)
				continue
			}
			if err := db.Q.UpdateUserAvatar(ctx, sql.UpdateUserAvatarParams{
				Url: pgtype.Text{String: model.FileURL(fileID, fileInfo.FileName), Valid: true},
				ID:  upload.UserID,
			}); err != nil {
				slog.Warn("Unable to update user avatar", "err", err)
				continue
			}
			return nil
		}
		return errors.Join(errs...)
	}); err != nil {
		slog.Warn("Errors registering files", "err", err)
	}
	return int64(len(commitResult.Commited)), err
}
