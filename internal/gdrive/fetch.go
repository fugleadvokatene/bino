package gdrive

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"runtime/debug"

	dblib "github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive/document"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

func (w *Worker) FetchJournal(
	googleID string,
) (errOut error) {
	ctx := context.Background()
	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("PANIC: %v\n", r)
			debug.PrintStack()
			errOut = fmt.Errorf("panicked: %v", r)
		}
	}()

	doc, err := w.GetDocument(googleID)
	if err != nil {
		return err
	} else {
		slog.InfoContext(ctx, "Found doc", "title", doc.Title)
	}
	nUploaded := 0
	for _, img := range doc.Images() {
		if !img.Volatile {
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
		} else {
			slog.InfoContext(ctx, "Uploaded image from Google doc", "id", fileID)
		}
		img.URL = model.FileURL(fileID, filename)
		img.Volatile = false
		nUploaded++
	}

	if nUploaded > 0 {
		w.bg.ImageHint.Send()
	}

	updateParams := sql.UpsertJournalParams{
		GoogleID: googleID,
		Header:   pgtype.Text{String: doc.Title, Valid: true},
		Lang:     "norwegian",
	}

	// Marshall to JSON, Markdown and HTML
	// Each in its own scope in case it can help the GC
	{
		marshalled, err := json.MarshalIndent(doc, "", "  ")
		if err != nil {
			slog.ErrorContext(ctx, "Couldn't marshal journal", "err", err)
		} else {
			updateParams.Json = marshalled
		}
	}
	{
		txt := document.GetIndexableText(&doc)
		updateParams.Body.String = txt
		updateParams.Body.Valid = txt != ""
	}
	{
		md := document.GetMarkdown(&doc)
		updateParams.Markdown.String = md
		updateParams.Markdown.Valid = md != ""
	}
	{
		var htmlBuffer bytes.Buffer
		doc.Templ().Render(ctx, &htmlBuffer)
		updateParams.Html.String = htmlBuffer.String()
		updateParams.Html.Valid = htmlBuffer.Len() > 0
	}

	return w.g.DB.Q.UpsertJournal(ctx, updateParams)
}
