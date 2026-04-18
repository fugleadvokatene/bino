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

type add struct {
	DB *db.Database
}

func (h *add) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if err := request.ValidateCSRF(r); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	fields, err := request.GetFormValues(r, "name", "description", "interval_type", "interval_amount", "interval_unit", "end_type", "end_count")
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

	if err := h.DB.Q.AddScheduleTemplate(ctx, sql.AddScheduleTemplateParams{
		Name:           fields["name"],
		Description:    fields["description"],
		IntervalHours:  intervalHours,
		MorningEvening: morningEvening,
		RemainingCount: remainingCount,
		Standard:       request.GetCheckboxValue(r, "standard"),
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
