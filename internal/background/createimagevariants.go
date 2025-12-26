package background

import (
	"context"
	"fmt"
	"image"
	"log/slog"

	dblib "github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func CreateImageVariants(
	ctx context.Context,
	db *dblib.Database,
) (int64, error) {
	successfulConversions := int64(0)

	// Create original variant
	filesMissingOriginalVariant, err := db.Q.GetFilesMissingOriginalVariant(ctx)
	if err != nil {
		slog.ErrorContext(ctx, "Couldn't get files missing variants", "err", err)
		return 0, err
	}
	for _, file := range filesMissingOriginalVariant {
		rc, err := db.Open(ctx, file.Uuid, file.Filename)
		if err != nil {
			slog.ErrorContext(ctx, "Couldn't open file", "err", err, "id", file.ID, "uuid", file.Uuid, "filename", file.Filename)
			continue
		}

		cfg, _, err := image.DecodeConfig(rc)
		rc.Close()

		if err != nil {
			slog.ErrorContext(ctx, "Couldn't decode image", "err", err, "id", file.ID)
		} else if hash, err := db.Sha256(ctx, db.MainDirectory, file.Uuid, file.Filename); err != nil {
			slog.ErrorContext(ctx, "Couldn't hash image", "err", err, "id", file.ID)
		} else if err := db.Q.PublishVariant(ctx, sql.PublishVariantParams{
			FileID:   file.ID,
			Variant:  model.FileVariantIDOriginal.String(),
			Filename: file.Filename,
			Mimetype: file.Mimetype,
			Size:     int32(file.Size),
			Width:    int32(cfg.Width),
			Height:   int32(cfg.Height),
			Sha256:   hash,
		}); err != nil {
			slog.ErrorContext(ctx, "Couldn't publish variant", "err", err, "id", file.ID)
		} else {
			successfulConversions++
		}
	}

	// Create miniatures
	filesMissingMiniatures, err := db.Q.GetFilesMissingMiniatures(ctx)
	if err != nil {
		slog.ErrorContext(ctx, "Couldn't get files missing miniatures", "err", err)
		return successfulConversions, err
	}
	for _, file := range filesMissingMiniatures {
		miniatures, err := db.CreateMiniatures(ctx, file.Uuid, file.Filename)
		if err != nil {
			return successfulConversions, fmt.Errorf("creating miniatures: %w", err)
		}
		slog.InfoContext(ctx, "Creating miniatures", "file", file.Filename, "miniatures", miniatures)
		if err := db.Transaction(ctx, func(ctx context.Context, db *dblib.Database) error {
			for _, mini := range miniatures {
				hash, err := db.Sha256(ctx, db.MainDirectory, file.Uuid, mini.VariantFilename)
				if err != nil {
					return fmt.Errorf("hashing variant '%s': %w", mini.Variant.String(), err)
				}
				params := sql.PublishVariantParams{
					FileID:   file.ID,
					Variant:  mini.Variant.String(),
					Filename: mini.VariantFilename,
					Mimetype: mini.MimeType,
					Size:     mini.Size,
					Width:    mini.Width,
					Height:   mini.Height,
					Sha256:   hash,
				}
				if err := db.Q.PublishVariant(ctx, params); err != nil {
					return fmt.Errorf("publishing variant '%s': %w", mini.Variant.String(), err)
				}
			}
			if err := db.Q.SetMiniaturesCreated(ctx, file.ID); err != nil {
				return fmt.Errorf("setting miniatures-created=true: %w", err)
			}
			return nil
		}); err != nil {
			return successfulConversions, fmt.Errorf("publishing miniatures for %s: %w", file.Uuid, err)
		} else {
			successfulConversions++
		}
	}

	return successfulConversions, nil
}
