package background

import (
	"context"
	"fmt"
	"log/slog"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func CreateImageHashes(
	ctx context.Context,
	db *db.Database,
) (int64, error) {
	filesMissingHash, err := db.Q.GetFilesMissingHash(ctx)
	if err != nil {
		return 0, fmt.Errorf("getting files missing hash: %w", err)
	}

	nHashed := int64(0)
	for _, file := range filesMissingHash {
		hash, err := db.Sha256File(ctx, db.MainRoot, file.Uuid, file.Filename)
		if err != nil {
			slog.ErrorContext(ctx, "Failed to create sha256 hash", "id", file.ID, "uuid", file.Uuid, "err", err)
			continue
		}
		if err := db.Q.SetFileHash(ctx, sql.SetFileHashParams{ID: file.ID, Sha256: hash}); err != nil {
			slog.ErrorContext(ctx, "Failed to set sha256 hash", "id", file.ID, "uuid", file.Uuid, "err", err)
			continue
		}
		nHashed++
	}

	imageVariantsMissingHash, err := db.Q.GetImageVariantsMissingHash(ctx)
	if err != nil {
		return nHashed, fmt.Errorf("getting image variants missing hash: %w", err)
	}
	for _, iv := range imageVariantsMissingHash {
		hash, err := db.Sha256File(ctx, db.MainRoot, iv.Uuid, iv.Filename)
		if err != nil {
			slog.ErrorContext(ctx, "Failed to create sha256 hash", "id", iv.FileID, "uuid", iv.Uuid, "err", err)
			continue
		}
		if err := db.Q.SetImageVariantHash(ctx, sql.SetImageVariantHashParams{FileID: iv.FileID, Variant: iv.Variant, Sha256: hash}); err != nil {
			slog.ErrorContext(ctx, "Failed to set sha256 hash", "id", iv.FileID, "uuid", iv.Uuid, "err", err)
			continue
		}
		nHashed++
	}

	return nHashed, err
}
