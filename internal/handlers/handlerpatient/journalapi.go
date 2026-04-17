package handlerpatient

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"log/slog"
	"net/http"
	"sync"
	"time"

	dblib "github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/gdrive/document"
	"github.com/fugleadvokatene/bino/internal/request"
	sqlc "github.com/fugleadvokatene/bino/internal/sql"
)

type journalAPIGet struct {
	DB *dblib.Database
}

func (h *journalAPIGet) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}

	patientData, err := h.DB.Q.GetPatient(ctx, patient)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusNotFound)
		return
	}

	if !patientData.GoogleID.Valid || patientData.GoogleID.String == "" {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	row, err := h.DB.Q.GetJournalJSON(ctx, patientData.GoogleID.String)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	// Serve edited_json directly if present (already GDocsDocument format).
	if len(row.EditedJson) > 0 {
		slog.InfoContext(ctx, "journal GET: serving edited_json", "googleID", patientData.GoogleID.String)
		w.Write(row.EditedJson) //nolint:errcheck
		return
	}

	// Parse raw Google Docs JSON and convert to GDocsDocument.
	slog.InfoContext(ctx, "journal GET: serving parsed raw_json", "googleID", patientData.GoogleID.String)

	var imageURLs map[string]string
	if len(row.ImageUrls) > 0 {
		json.Unmarshal(row.ImageUrls, &imageURLs) //nolint:errcheck
	}

	gdocsDoc, err := document.ParseRawGDocs(row.RawJson, imageURLs)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(gdocsDoc) //nolint:errcheck
}

// pushDebouncer coalesces rapid saves: only the last save within the window
// triggers a push to Google Docs.
type pushDebouncer struct {
	mu     sync.Mutex
	timers map[string]*time.Timer
}

func newPushDebouncer() *pushDebouncer {
	return &pushDebouncer{timers: make(map[string]*time.Timer)}
}

func (d *pushDebouncer) schedule(googleID string, delay time.Duration, fn func()) {
	d.mu.Lock()
	defer d.mu.Unlock()
	if t, ok := d.timers[googleID]; ok {
		t.Stop()
	}
	d.timers[googleID] = time.AfterFunc(delay, fn)
}

type journalAPIPost struct {
	DB           *dblib.Database
	GDriveWorker *gdrive.Worker
	debounce     *pushDebouncer
}

func (h *journalAPIPost) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	patient, err := request.GetPathID(r, "patient")
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}

	patientData, err := h.DB.Q.GetPatient(ctx, patient)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusNotFound)
		return
	}

	if !patientData.GoogleID.Valid || patientData.GoogleID.String == "" {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	body, err := io.ReadAll(io.LimitReader(r.Body, 4<<20))
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}

	if !json.Valid(body) {
		request.AjaxError(w, r, errors.New("invalid JSON"), http.StatusBadRequest)
		return
	}

	if err := h.DB.Q.UpdateJournalEdited(ctx, sqlc.UpdateJournalEditedParams{
		GoogleID:   patientData.GoogleID.String,
		EditedJson: body,
	}); err != nil {
		request.AjaxError(w, r, err, http.StatusInternalServerError)
		return
	}

	googleID := patientData.GoogleID.String
	slog.InfoContext(ctx, "journal POST: saved to DB, scheduling push in 10s", "googleID", googleID)
	h.debounce.schedule(googleID, 10*time.Second, func() {
		h.pushToGoogleDocs(googleID)
	})

	w.WriteHeader(http.StatusNoContent)
}

func (h *journalAPIPost) pushToGoogleDocs(googleID string) {
	ctx := context.Background()
	slog.InfoContext(ctx, "EditJournal: debounce fired, pushing to Google Docs", "googleID", googleID)

	row, err := h.DB.Q.GetJournalJSON(ctx, googleID)
	if err != nil {
		slog.ErrorContext(ctx, "EditJournal: loading edited_json", "googleID", googleID, "err", err)
		return
	}
	if len(row.EditedJson) == 0 {
		slog.InfoContext(ctx, "EditJournal: no edited_json, skipping", "googleID", googleID)
		return
	}

	var gdocsDoc document.GDocsDocument
	if err := json.Unmarshal(row.EditedJson, &gdocsDoc); err != nil {
		slog.ErrorContext(ctx, "EditJournal: parsing edited_json", "googleID", googleID, "err", err)
		return
	}

	slog.InfoContext(ctx, "EditJournal: calling BatchUpdate", "googleID", googleID, "paragraphs", len(gdocsDoc.Paragraphs))
	if err := h.GDriveWorker.EditJournal(googleID, &gdocsDoc); err != nil {
		slog.ErrorContext(ctx, "EditJournal: pushing to Google Docs", "googleID", googleID, "err", err)
		return
	}
	slog.InfoContext(ctx, "EditJournal: done", "googleID", googleID)
}
