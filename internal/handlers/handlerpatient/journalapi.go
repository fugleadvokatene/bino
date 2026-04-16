package handlerpatient

import (
	"encoding/json"
	"net/http"

	dblib "github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive/document"
	"github.com/fugleadvokatene/bino/internal/request"
)

type journalAPI struct {
	DB *dblib.Database
}

func (h *journalAPI) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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

	doc, err := document.ParseRawJSON(row.RawJson, row.ImageUrls)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(doc)
}
