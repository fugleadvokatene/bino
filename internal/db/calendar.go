package db

import (
	"context"
	"time"

	"github.com/fugleadvokatene/bino/internal/calendar"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

func (db *Database) GetUnavailablePeriodsInRange(ctx context.Context, start, end time.Time, lang *language.Language) ([]calendar.Event, error) {
	periods, err := db.Q.GetUnavailablePeriodsInRange(ctx, sql.GetUnavailablePeriodsInRangeParams{
		RangeBegin: pgtype.Date{Time: start, Valid: true},
		RangeEnd:   pgtype.Date{Time: end, Valid: true},
	})
	if err != nil {
		return nil, err
	}
	return generic.SliceToSlice(periods, func(in sql.GetUnavailablePeriodsInRangeRow) calendar.Event {
		return in.ToFullCalendarEvent(lang)
	}), nil
}

func (db *Database) GetEventsForCalendar(ctx context.Context, start, end time.Time, lang *language.Language) ([]calendar.Event, error) {
	periods, err := db.Q.GetEventsForCalendar(ctx, sql.GetEventsForCalendarParams{
		RangeBegin: pgtype.Timestamptz{Time: start, Valid: true},
		RangeEnd:   pgtype.Timestamptz{Time: end, Valid: true},
	})
	if err != nil {
		return nil, err
	}
	return generic.SliceToSlice(periods, func(in sql.GetEventsForCalendarRow) calendar.Event {
		return in.ToFullCalendarEvent(lang)
	}), nil
}
