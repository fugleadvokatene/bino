package handlerpatient

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"runtime/debug"

	"github.com/fugleadvokatene/bino/internal/background"
	"github.com/fugleadvokatene/bino/internal/config"
	dblib "github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type fetchJournal struct {
	DB           *dblib.Database
	GDriveWorker *gdrive.Worker
	Config       *config.Config
	Jobs         *background.Jobs
}

func (h *fetchJournal) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	go fetch(h.DB, h.GDriveWorker, h.Jobs, patient)

	commonData.Success(commonData.Language.TODO("Journalen innhentes, oppdater siden om noen sekunder"))
	request.RedirectToReferer(w, r)
}

func fetch(
	db *dblib.Database,
	worker *gdrive.Worker,
	jobs *background.Jobs,
	patientID int32,
) {
	ctx := context.Background()
	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("PANIC: %v\n", r)
			debug.PrintStack()
		}
	}()

	patientData, err := db.Q.GetPatient(ctx, patientID)
	if err != nil {
		fmt.Printf("Err: %s\n", err)
		return
	}

	googleID := patientData.GoogleID
	if !googleID.Valid || googleID.String == "" {
		fmt.Printf("Err: %s\n", err)
		return
	}

	doc, err := worker.GetDocument(googleID.String)
	if err != nil {
		fmt.Printf("Err: %s\n", err)
	} else {
		fmt.Printf("Doc found\n")
	}
	nUploaded := 0
	for _, img := range doc.Images() {
		if !img.Volatile {
			continue
		}
		filename, fileID, err := dblib.UploadImageFromURL(
			ctx,
			img.URL,
			db,
		)
		if err != nil {
			slog.ErrorContext(ctx, "Couldn't upload image from Google doc", "err", err)
			continue
		}
		img.URL = model.FileURL(fileID, filename)
		img.Volatile = false
		nUploaded++
	}

	if nUploaded > 0 {
		jobs.ImageHint.Send()
	}

	updateParams := sql.UpsertJournalParams{
		GoogleID: googleID.String,
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
		var mdBuffer bytes.Buffer
		doc.Markdown(&mdBuffer)
		updateParams.Markdown.String = mdBuffer.String()
		updateParams.Markdown.Valid = mdBuffer.Len() > 0
	}
	{
		var htmlBuffer bytes.Buffer
		doc.Templ().Render(ctx, &htmlBuffer)
		updateParams.Html.String = htmlBuffer.String()
		updateParams.Html.Valid = htmlBuffer.Len() > 0
	}

	if err := db.Q.UpsertJournal(ctx, updateParams); err != nil {
		slog.ErrorContext(ctx, "Couldn't upsert journal", "err", err)
	}
}
