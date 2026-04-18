package db

import (
	"cmp"
	"context"
	"fmt"
	"slices"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func (db *Database) GetFiles(ctx context.Context, limit, offset int32) ([]model.File, int32, error) {
	n, err := db.Q.NumFiles(ctx)
	if err != nil {
		return nil, 0, fmt.Errorf("counting files: %w", err)
	}

	filesSQL, err := db.Q.GetFiles(ctx, sql.GetFilesParams{Limit: limit, Offset: offset})
	if err != nil {
		return nil, 0, fmt.Errorf("fetching files: %w", err)
	}
	files := generic.SliceToSlice(filesSQL, func(in sql.File) model.File { return in.ToModel() })

	if len(files) > 0 {
		fileIDs := generic.SliceToSlice(files, func(f model.File) int32 { return f.ID })

		fileWikiAssociations, err := db.Q.GetFileWikiAssociations(ctx, fileIDs)
		if err != nil {
			return nil, 0, fmt.Errorf("getting file wiki associations: %w", err)
		}
		generic.GroupByID(
			files,
			fileWikiAssociations,
			getFileID,
			func(fwa *sql.GetFileWikiAssociationsRow) int32 { return fwa.FileID },
			func(f *model.File, fwa *sql.GetFileWikiAssociationsRow) {
				f.WikiAssociations = append(f.WikiAssociations, fwa.ToModel())
			},
		)

		imageVariants, err := db.Q.GetImageVariants(ctx, fileIDs)
		if err != nil {
			return nil, 0, fmt.Errorf("getting image variants: %w", err)
		}
		generic.GroupByID(
			files,
			imageVariants,
			getFileID,
			func(iv *sql.ImageVariant) int32 { return iv.FileID },
			func(f *model.File, iv *sql.ImageVariant) {
				f.ImageVariants = append(f.ImageVariants, iv.ToModel())
			},
		)
	}

	return files, int32(n), nil
}

func (db *Database) GetLargestFiles(ctx context.Context, limit int32) ([]model.File, error) {
	filesSQL, err := db.Q.GetLargestFiles(ctx, int32(limit))
	if err != nil {
		return nil, fmt.Errorf("fetching largest files: %w", err)
	}
	files := generic.SliceToSlice(filesSQL, func(in sql.File) model.File { return in.ToModel() })

	if len(files) > 0 {
		fileIDs := generic.SliceToSlice(files, func(f model.File) int32 { return f.ID })
		imageVariants, err := db.Q.GetImageVariants(ctx, fileIDs)
		if err != nil {
			return nil, fmt.Errorf("getting image variants: %w", err)
		}
		generic.GroupByID(
			files,
			imageVariants,
			getFileID,
			func(iv *sql.ImageVariant) int32 { return iv.FileID },
			func(f *model.File, iv *sql.ImageVariant) {
				f.ImageVariants = append(f.ImageVariants, iv.ToModel())
			},
		)
		// GroupByID sorts by ID in place; restore size-descending order
		slices.SortStableFunc(files, func(a, b model.File) int {
			return cmp.Compare(b.Size, a.Size)
		})
	}

	return files, nil
}

func getFileID(f *model.File) int32 {
	return f.ID
}
