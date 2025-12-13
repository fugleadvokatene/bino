package gdrive

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

func (w *Worker) searchIndexWorker(ctx context.Context) {
	for {
		w.searchIndexAll(ctx)
		time.Sleep(time.Minute * 10)
	}
}

func (w *Worker) searchIndexAll(ctx context.Context) {
	w.searchIndexFolder(ctx, w.cfg.JournalFolder)
	for _, folder := range w.cfg.ExtraJournalFolders {
		w.searchIndexFolder(ctx, folder)
	}
}

func (w *Worker) listFiles(ctx context.Context, folderID string, pageToken string) (ListFilesResult, error) {
	res, err := w.ListFiles(ListFilesParams{
		Parent:    folderID,
		PageToken: pageToken,
	})
	if err != nil {
		return ListFilesResult{}, err
	}
	return ListFilesResult{
		Files:         res.Files,
		Folder:        res.Folder,
		NextPageToken: res.NextPageToken,
	}, nil
}

func (w *Worker) searchIndexFolder(ctx context.Context, folderID string) {
	pageToken := ""
	for {
		res, err := w.listFiles(ctx, folderID, pageToken)
		if err != nil {
			log.Printf("ERROR listing files: %s", err)
			return
		}

		log.Printf("START: converting %d files for %s", len(res.Files), res.Folder.Name)
		for _, file := range res.Files {
			if err := w.searchIndexFile(ctx, res.Folder, file); err != nil {
				log.Printf("ERROR (%s): %s", file.Name, err.Error())
			}
		}
		log.Printf("DONE: converting files for %s", res.Folder.Name)

		if res.NextPageToken == "" {
			break
		}
		pageToken = res.NextPageToken
	}
}

func (w *Worker) searchIndexFile(ctx context.Context, folder, file Item) error {
	// Initialize to be used in the extraData field
	journalInfo := db.SearchJournalInfo{
		FolderURL:  string(folder.FolderURL()),
		FolderName: folder.Name,
	}

	// Get info
	info, err := w.getSearchIndexInfo(ctx, file, journalInfo)
	if err != nil {
		return fmt.Errorf("fetching info for patient: %w", err)
	}

	// Delete trashed files
	if file.Trashed {
		if info.didSearchEntryExist() {
			if err := w.g.DB.Q.DeleteSearchEntry(ctx, sql.DeleteSearchEntryParams{
				Namespace:     info.namespace,
				AssociatedUrl: info.urlField,
			}); err != nil {
				return fmt.Errorf("deleting search query: %w", err)
			}
		}
		return nil
	}

	// If search-entry is synced, only update extra-data
	if info.didSearchEntryExist() && !file.ModifiedTime.After(info.dbUpdatedField.Time) {
		if info.extraDataField.Valid {
			tag, err := w.g.DB.Q.UpdateSearchMetadata(ctx, sql.UpdateSearchMetadataParams{
				Namespace:     info.namespace,
				AssociatedUrl: info.urlField,
				ExtraData:     info.extraDataField,
				Created:       info.createdField,
				Updated:       info.dbUpdatedField,
				Header:        info.headerField,
			})
			if err != nil || tag.RowsAffected() == 0 {
				log.Printf("%s: updating extra data: err=%v", file.Name, err)
			}
		}
		return nil
	}

	// Read the document
	journal, err := w.g.ExportDocument(file.ID)
	if err != nil {
		// On failure, create a skipped entry. It won't show up in search, but we also won't try to read the document later.
		if err := w.g.DB.Q.UpsertSkippedSearchEntry(ctx, sql.UpsertSkippedSearchEntryParams{
			Namespace:     info.namespace,
			AssociatedUrl: info.urlField,
			Updated:       info.fileUpdatedField,
			Created:       info.createdField,
			Header:        info.headerField,
			Lang:          info.language,
			ExtraData:     info.extraDataField,

			Body: pgtype.Text{String: info.extraDataText, Valid: true},
		}); err != nil {
			return fmt.Errorf("creating skipped entry: %w", err)
		}
		return fmt.Errorf("%w (created skipped entry)", err)
	}

	// Create valid search entry
	if err := w.g.DB.Q.UpsertSearchEntry(ctx, sql.UpsertSearchEntryParams{
		Namespace:     info.namespace,
		AssociatedUrl: info.urlField,
		Updated:       info.fileUpdatedField,
		Created:       info.createdField,
		Header:        info.headerField,
		Lang:          info.language,
		ExtraData:     info.extraDataField,

		Body: pgtype.Text{String: journal.Content + info.extraDataText, Valid: true},
	}); err != nil {
		return fmt.Errorf("creating entry: %w", err)
	}

	return nil
}

type searchIndexInfo struct {
	namespace        string
	urlField         pgtype.Text
	extraDataText    string
	extraDataField   pgtype.Text
	dbUpdatedField   pgtype.Timestamptz
	fileUpdatedField pgtype.Timestamptz
	createdField     pgtype.Timestamptz
	headerField      pgtype.Text
	language         string
}

func (sii *searchIndexInfo) didSearchEntryExist() bool {
	return sii.dbUpdatedField.Valid
}

func (w *Worker) getSearchIndexInfo(ctx context.Context, file Item, journalInfo db.SearchJournalInfo) (searchIndexInfo, error) {
	var out searchIndexInfo

	// See if there are existing patients
	ids, err := w.g.DB.Q.GetPatientsByJournalURL(ctx, file.ID)
	if err != nil {
		return searchIndexInfo{}, fmt.Errorf("querying patients by journal URL: %w", err)
	}

	// Extract data that is polymorphic on whether we have a patient or not
	var extraData interface{ IndexableText() string }
	extraData = &journalInfo
	out.namespace = "journal"
	out.urlField.String = file.DocumentURL()
	out.urlField.Valid = true
	if len(ids) == 1 {
		out.namespace = "patient"
		out.urlField.String = model.PatientURL(ids[0])
		extraData = &db.SearchPatientInfo{
			JournalInfo: journalInfo,
			JournalURL:  file.DocumentURL(),
		}
	}

	// Serialize extradata
	out.extraDataText = extraData.IndexableText()
	if extraDataStr, err := json.Marshal(extraData); err == nil {
		out.extraDataField = pgtype.Text{String: string(extraDataStr), Valid: true}
	} else {
		log.Printf("Marshalling extraData for %s: %v", file.Name, err)
	}

	// Get updated-time
	if updatedField, err := w.g.DB.Q.GetSearchUpdatedTime(ctx, sql.GetSearchUpdatedTimeParams{
		Namespace:     out.namespace,
		AssociatedUrl: out.urlField,
	}); err == nil {
		out.dbUpdatedField = updatedField
	} else if !errors.Is(err, pgx.ErrNoRows) {
		log.Printf("Getting update time for %s: %v", file.Name, err)
	}

	// If the file name starts with a date, override the created-time to that date
	out.createdField = pgtype.Timestamptz{Time: file.CreatedTime, Valid: true}
	if fields := strings.Fields(file.Name); len(fields) > 0 {
		if t, err := time.Parse(time.DateOnly, fields[0]); err == nil {
			out.createdField = pgtype.Timestamptz{Time: t, Valid: true}
		}
	}

	out.fileUpdatedField = pgtype.Timestamptz{Time: file.ModifiedTime, Valid: !file.ModifiedTime.IsZero()}
	out.headerField = pgtype.Text{String: file.Name, Valid: true}
	out.language = "norwegian"

	return out, nil
}
