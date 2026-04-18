package handlertasktemplate

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerschedule"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type edit struct {
	DB *db.Database
}

func (h *edit) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if err := request.ValidateCSRF(r); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	id, err := request.GetPathID(r, "template")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	fields, err := request.GetFormValues(r, "name", "description", "interval_type", "interval_amount", "interval_unit", "end_type", "end_count", "standard")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if strings.TrimSpace(fields["name"]) == "" {
		handlererror.Error(w, r, fmt.Errorf("name is required"))
		return
	}

	morningEvening, intervalHours := handlerschedule.ParseIntervalFromForm(fields["interval_type"], fields["interval_amount"], fields["interval_unit"])
	remainingCount, _ := handlerschedule.ParseEndFromForm(fields["end_type"], fields["end_count"], "")

	if err := h.DB.Q.UpdateScheduleTemplate(ctx, sql.UpdateScheduleTemplateParams{
		ID:             id,
		Name:           fields["name"],
		Description:    fields["description"],
		IntervalHours:  intervalHours,
		MorningEvening: morningEvening,
		RemainingCount: remainingCount,
		Standard:       fields["standard"] == "1",
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
