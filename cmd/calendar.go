package main

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/calendar"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlercalendar"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/jackc/pgx/v5/pgtype"
)

func (server *Server) GetUnavailablePeriodsInRange(ctx context.Context, start, end time.Time) ([]calendar.Event, error) {
	commonData := request.MustLoadCommonData(ctx)
	periods, err := server.Queries.GetUnavailablePeriodsInRange(ctx, db.GetUnavailablePeriodsInRangeParams{
		RangeBegin: pgtype.Date{Time: start, Valid: true},
		RangeEnd:   pgtype.Date{Time: end, Valid: true},
	})
	if err != nil {
		return nil, err
	}
	return SliceToSlice(periods, func(in db.GetUnavailablePeriodsInRangeRow) calendar.Event {
		return in.ToFullCalendarEvent(commonData.Language)
	}), nil
}

func (server *Server) ajaxCalendarPatientEventsHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	start, end, err := handlercalendar.CalendarRange(r)
	if err != nil {
		request.LogError(r, err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	periods, err := server.Queries.GetEventsForCalendar(ctx, db.GetEventsForCalendarParams{
		RangeBegin: pgtype.Timestamptz{Time: start, Valid: true},
		RangeEnd:   pgtype.Timestamptz{Time: end, Valid: true},
	})
	if err != nil {
		request.LogError(r, err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	out := SliceToSlice(periods, func(in db.GetEventsForCalendarRow) calendar.Event {
		return in.ToFullCalendarEvent(ctx, commonData.Language)
	})
	bin, err := json.Marshal(out)
	if err != nil {
		request.LogError(r, err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Write(bin)
}
