package handlerschedule

import (
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type complete struct {
	DB *db.Database
}

func (h *complete) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if err := request.ValidateCSRF(r); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	id, err := request.GetPathID(r, "schedule")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	s, err := h.DB.Q.GetSchedule(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	nextDueAt, active, newRemaining := calculateNext(s)

	if err := h.DB.Q.CompleteSchedule(ctx, sql.CompleteScheduleParams{
		ID:             id,
		NextDueAt:      nextDueAt,
		Active:         active,
		RemainingCount: newRemaining,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func calculateNext(s sql.Schedule) (nextDueAt pgtype.Timestamptz, active bool, newRemaining pgtype.Int4) {
	newRemaining = s.RemainingCount
	if s.RemainingCount.Valid {
		newRemaining.Int32 = s.RemainingCount.Int32 - 1
		if newRemaining.Int32 <= 0 {
			return s.NextDueAt, false, newRemaining
		}
	}

	if !s.MorningEvening && !s.IntervalHours.Valid {
		return s.NextDueAt, false, newRemaining
	}

	var nextTime time.Time
	if s.MorningEvening {
		nextTime = nextMorningEvening(s.NextDueAt.Time)
	} else {
		nextTime = s.NextDueAt.Time.Add(time.Duration(s.IntervalHours.Int32) * time.Hour)
	}

	if s.EndDate.Valid && nextTime.After(s.EndDate.Time) {
		return pgtype.Timestamptz{Time: nextTime, Valid: true}, false, newRemaining
	}

	return pgtype.Timestamptz{Time: nextTime, Valid: true}, true, newRemaining
}
