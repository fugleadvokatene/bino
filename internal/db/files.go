package db

import (
	"context"
	"fmt"
	"slices"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func (db *Database) GetFilesAccessibleByUser(
	ctx context.Context,
	userID int32,
) ([]model.File, error) {
	filesSQL, err := db.Q.GetFilesAccessibleByUser(ctx, sql.GetFilesAccessibleByUserParams{
		Creator:       userID,
		Accessibility: int32(model.FileAccessibilityPersonal),
	})
	if err != nil {
		return nil, fmt.Errorf("fetching files accessible by user: %w", err)
	}
	files := generic.SliceToSlice(filesSQL, func(in sql.File) model.File { return in.ToModel() })

	// Attach file associations
	fileWikiAssociations, err := db.Q.GetFileWikiAssociationsAccessibleByUser(ctx, sql.GetFileWikiAssociationsAccessibleByUserParams{
		Creator:       userID,
		Accessibility: int32(model.FileAccessibilityPersonal),
	})
	if err != nil {
		return nil, fmt.Errorf("getting file wiki associations: %w", err)
	}
	generic.GroupByID(
		files,
		fileWikiAssociations,
		getFileID,
		func(fwa *sql.GetFileWikiAssociationsAccessibleByUserRow) int32 {
			return fwa.FileID
		},
		func(f *model.File, fwa *sql.GetFileWikiAssociationsAccessibleByUserRow) {
			f.WikiAssociations = append(f.WikiAssociations, fwa.ToModel())
		},
	)

	// Attach patient associations
	filePatientAssociations, err := db.Q.GetFilePatientAssociationsAccessibleByUser(ctx, sql.GetFilePatientAssociationsAccessibleByUserParams{
		Creator:       userID,
		Accessibility: int32(model.FileAccessibilityPersonal),
	})
	if err != nil {
		return nil, fmt.Errorf("getting file patient associations: %w", err)
	}
	generic.GroupByID(
		files,
		filePatientAssociations,
		getFileID,
		func(fpa *sql.GetFilePatientAssociationsAccessibleByUserRow) int32 {
			return fpa.FileID
		},
		func(f *model.File, fpa *sql.GetFilePatientAssociationsAccessibleByUserRow) {
			f.PatientAssociations = append(f.PatientAssociations, fpa.ToModel())
		},
	)

	// Attach image variants
	imageVariants, err := db.Q.GetImageVariantsAccessibleByUser(ctx, sql.GetImageVariantsAccessibleByUserParams{
		Creator:       userID,
		Accessibility: int32(model.FileAccessibilityPersonal),
	})
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
