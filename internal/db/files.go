package db

import (
	"context"
	"fmt"
	"slices"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func (db *Database) GetFiles(
	ctx context.Context,
) ([]model.File, error) {
	filesSQL, err := db.Q.GetFiles(ctx)
	if err != nil {
		return nil, fmt.Errorf("fetching files accessible by user: %w", err)
	}
	files := generic.SliceToSlice(filesSQL, func(in sql.File) model.File { return in.ToModel() })

	// Attach file associations
	fileWikiAssociations, err := db.Q.GetFileWikiAssociations(ctx)
	if err != nil {
		return nil, fmt.Errorf("getting file wiki associations: %w", err)
	}
	generic.GroupByID(
		files,
		fileWikiAssociations,
		getFileID,
		func(fwa *sql.GetFileWikiAssociationsRow) int32 {
			return fwa.FileID
		},
		func(f *model.File, fwa *sql.GetFileWikiAssociationsRow) {
			f.WikiAssociations = append(f.WikiAssociations, fwa.ToModel())
		},
	)

	// Attach image variants
	imageVariants, err := db.Q.GetImageVariants(ctx)
	if err != nil {
		return nil, fmt.Errorf("getting image variants: %w", err)
	}
	generic.GroupByID(
		files,
		imageVariants,
		getFileID,
		func(iv *sql.ImageVariant) int32 {
			return iv.FileID
		},
		func(f *model.File, iv *sql.ImageVariant) {
			f.ImageVariants = append(f.ImageVariants, iv.ToModel())
		},
	)

	// Sort by time
	slices.Reverse(files)

	return files, nil
}

func getFileID(f *model.File) int32 {
	return f.ID
}
