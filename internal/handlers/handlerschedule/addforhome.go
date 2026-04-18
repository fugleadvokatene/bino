package handlerschedule

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type addForHome struct {
	DB *db.Database
}

func (h *addForHome) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	homeID, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	fields, err := request.GetFormValues(r, "description", "next_due_at", "interval_type", "interval_amount", "interval_unit", "end_type", "end_count", "end_date")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if strings.TrimSpace(fields["description"]) == "" {
		handlererror.Error(w, r, fmt.Errorf("description is required"))
		return
	}

	nextDueAt, err := parseDatetimeLocal(fields["next_due_at"])
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	morningEvening, intervalHours := parseIntervalFromForm(fields["interval_type"], fields["interval_amount"], fields["interval_unit"])
	remainingCount, endDate := parseEndFromForm(fields["end_type"], fields["end_count"], fields["end_date"])

	scheduleID, err := h.DB.Q.AddSchedule(ctx, sql.AddScheduleParams{
		Description:    fields["description"],
		IntervalHours:  intervalHours,
		NextDueAt:      nextDueAt,
		MorningEvening: morningEvening,
		RemainingCount: remainingCount,
		EndDate:        endDate,
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.LinkScheduleToHome(ctx, sql.LinkScheduleToHomeParams{
		ScheduleID: scheduleID,
		HomeID:     homeID,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
