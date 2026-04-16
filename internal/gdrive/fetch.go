package gdrive

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"runtime/debug"

	dblib "github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive/document"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

// CurrentJournalVersion is the version stored by FetchJournal. Bump this
// whenever the stored format changes so the indexer re-fetches outdated rows.
const CurrentJournalVersion = 1

type ParentInfo struct {
	ID   string
	Name string
}

func (w *Worker) FetchJournal(
	googleID string,
	parentInfo *ParentInfo,
) (errOut error) {
	ctx := context.Background()
	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("PANIC: %v\n", r)
			debug.PrintStack()
			errOut = fmt.Errorf("panicked: %v", r)
		}
	}()

	var parentGoogleID pgtype.Text
	if parentInfo != nil {
		parentGoogleID.String = parentInfo.ID
		parentGoogleID.Valid = true
	} else {
		parentGoogleID = w.resolveParent(ctx, googleID)
	}

	rawDoc, err := w.GetRawDocument(googleID)
	if err != nil {
		return err
	}
	slog.InfoContext(ctx, "Found doc", "title", rawDoc.Title)

	doc, err := document.New(rawDoc)
	if err != nil {
		return err
	}

	// Load existing image URL overrides so we don't re-upload unchanged images.
	imageURLs := make(map[string]string)
	if existing, err := w.g.DB.Q.GetJournalImageURLs(ctx, googleID); err == nil {
		json.Unmarshal(existing, &imageURLs) //nolint:errcheck
	}

	nUploaded := 0
	for _, img := range doc.Images() {
		if _, exists := imageURLs[img.InlineObjectID]; exists {
			continue
		}
		filename, fileID, err := dblib.UploadImageFromURL(
			ctx,
			img.URL,
			w.g.DB,
		)
		if err != nil {
			slog.ErrorContext(ctx, "Couldn't upload image from Google doc", "err", err)
			continue
		}
		slog.InfoContext(ctx, "Uploaded image from Google doc", "id", fileID)
		imageURLs[img.InlineObjectID] = model.FileURL(fileID, filename)
		nUploaded++
	}

	if nUploaded > 0 {
		w.bg.ImageHint.Send()
	}

	imageURLsJSON, err := json.Marshal(imageURLs)
	if err != nil {
		return fmt.Errorf("marshalling image URLs: %w", err)
	}

	rawDocJSON, err := json.MarshalIndent(rawDoc, "", "  ")
	if err != nil {
		return fmt.Errorf("marshalling raw document: %w", err)
	}

	txt := document.GetIndexableText(&doc)

	return w.g.DB.Q.UpsertJournal(ctx, sql.UpsertJournalParams{
		GoogleID:       googleID,
		Origin:         int16(model.JournalOriginIDGoogle),
		ParentGoogleID: parentGoogleID,
		Header:         pgtype.Text{String: rawDoc.Title, Valid: true},
		Lang:           "norwegian",
		RawJson:        rawDocJSON,
		ImageUrls:      imageURLsJSON,
		Body:           pgtype.Text{String: txt, Valid: txt != ""},
		Version:        CurrentJournalVersion,
	})
}

func (w *Worker) resolveParent(ctx context.Context, googleID string) pgtype.Text {
	file, err := w.GetFile(googleID)
	if err != nil {
		slog.ErrorContext(ctx, "Looking up file to get ctx", "err", err)
		return pgtype.Text{}
	}

	if _, err := w.g.DB.Q.GetGoogleFolder(ctx, file.ParentID); errors.Is(err, pgx.ErrNoRows) {
		if parent, err := w.GetFile(file.ParentID); err != nil {
			slog.ErrorContext(ctx, "Looking up parent folder", "err", err, "file ID", file.ID, "parent ID", file.ParentID)
		} else if err := w.g.DB.Q.SaveGoogleFolder(ctx, sql.SaveGoogleFolderParams{
			GoogleID: parent.ID,
			Name:     parent.Name,
		}); err != nil {
			slog.ErrorContext(ctx, "Saving parent folder info", "err", err)
		}
	}

	return pgtype.Text{String: file.ParentID, Valid: file.ParentID != ""}
}
