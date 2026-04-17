package handlerpatient

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"

	dblib "github.com/fugleadvokatene/bino/internal/db"
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

	if len(row.EditedJson) > 0 {
		w.Write(row.EditedJson)
		return
	}

	doc, err := document.ParseRawJSON(row.RawJson, row.ImageUrls)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(doc)
}

type journalAPIPost struct {
	DB *dblib.Database
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

	w.WriteHeader(http.StatusNoContent)
}
