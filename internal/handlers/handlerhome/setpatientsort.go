package handlerhome

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type setPatientSort struct {
	DB *db.Database
}

type patientSortSettings struct {
	autoSort  bool
	field     string
	direction string
}

var patientSortModes = map[string]patientSortSettings{
	model.PatientSortModeManual:  {false, model.PatientSortFieldCheckinDate, model.SortDirectionDescending},
	model.PatientSortModeNewest:  {true, model.PatientSortFieldCheckinDate, model.SortDirectionDescending},
	model.PatientSortModeOldest:  {true, model.PatientSortFieldCheckinDate, model.SortDirectionAscending},
	model.PatientSortModeSpecies: {true, model.PatientSortFieldSpecies, model.SortDirectionAscending},
	model.PatientSortModeName:    {true, model.PatientSortFieldName, model.SortDirectionAscending},
}

func (h *setPatientSort) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	if err := request.ValidateCSRF(r); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	id, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	mode, err := request.GetFormValue(r, "mode")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	settings, ok := patientSortModes[mode]
	if !ok {
		handlererror.Error(w, r, fmt.Errorf("invalid sort mode: %s", mode))
		return
	}

	if err := h.DB.Q.SetHomeSetting(ctx, sql.SetHomeSettingParams{
		HomeID: id,
		Key:    "patient-auto-sort",
		Value:  fmt.Sprintf("%t", settings.autoSort),
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.SetHomeSetting(ctx, sql.SetHomeSettingParams{
		HomeID: id,
		Key:    "patient-sort-field",
		Value:  settings.field,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.SetHomeSetting(ctx, sql.SetHomeSettingParams{
		HomeID: id,
		Key:    "patient-sort-direction",
		Value:  settings.direction,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if settings.autoSort {
		if err := h.DB.ApplyPatientSort(ctx, id, commonData.Lang32()); err != nil {
			handlererror.Error(w, r, err)
			return
		}
	}

	request.RedirectToReferer(w, r)
}
