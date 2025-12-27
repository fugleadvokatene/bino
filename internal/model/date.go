package model

import (
	"fmt"
	"slices"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

type Date struct {
	Year  int
	Month time.Month
	Day   int // 1-31
}

func DateViewFromPGDate(pg pgtype.Date) Date {
	if pg.Valid {
		return DateViewFromTime(pg.Time)
	}
	return Date{}
}

func DateViewFromTime(t time.Time) Date {
	if t.IsZero() {
		return Date{}
	}
	return Date{
		Year:  t.Year(),
		Month: t.Month(),
		Day:   t.Day(),
	}
}

func (dv Date) Valid() bool {
	return dv.Day != 0 && dv.Month >= 1 && dv.Month <= 12 && dv.Year > 0 && dv.Year < 10000
}

func (dv Date) ToTime() time.Time {
	return time.Date(dv.Year, dv.Month, dv.Day, 0, 0, 0, 0, time.UTC)
}

func (dv Date) ToPGDate() pgtype.Date {
	return pgtype.Date{
		Time:  dv.ToTime(),
		Valid: dv.Valid(),
	}
}

func (dv Date) Before(other Date) bool {
	if dv.Year < other.Year {
		return true
	}
	if dv.Year > other.Year {
		return false
	}
	if dv.Month < other.Month {
		return true
	}
	if dv.Month > other.Month {
		return false
	}
	return dv.Day < other.Day
}

func (dv Date) After(other Date) bool {
	if dv.Year > other.Year {
		return true
	}
	if dv.Year < other.Year {
		return false
	}
	if dv.Month > other.Month {
		return true
	}
	if dv.Month < other.Month {
		return false
	}
	return dv.Day > other.Day
}

type Period struct {
	ID     int32
	HomeID int32
	From   Date
	To     Date
	Note   string
}

func (pv Period) Indefinite() bool {
	return !pv.To.Valid()
}
func AvailabilityDate(periods []Period) (Availability, Date) {
	// No unavailable periods means availability forever
	if len(periods) == 0 {
		return AvailabilityAvailableIndefinitely, Date{}
	}

	// Reference time is today (inclusive)
	q := DateViewFromTime(time.Now())

	// Sort periods by start date
	slices.SortFunc(periods, func(a, b Period) int {
		switch {
		case a.From.Before(b.From):
			return -1
		case a.From.After(b.From):
			return 1
		default:
			return 0
		}
	})

	// Merge overlapping or touching periods (inclusive bounds)
	merged := []Period{}
	for _, p := range periods {
		if len(merged) == 0 {
			merged = append(merged, p)
			continue
		}

		last := &merged[len(merged)-1]

		// Gap exists only if last.To < p.From
		if last.To.Valid() && last.To.Before(p.From) {
			merged = append(merged, p)
			continue
		}

		// Extend the previous period if needed
		if !last.To.Valid() || !p.To.Valid() || p.To.After(last.To) {
			last.To = p.To
		}
	}

	// Determine availability relative to today
	for _, p := range merged {
		// Today is before the next unavailable period
		if q.Before(p.From) {
			return AvailabilityAvailableUntil, p.From
		}

		// Today is inside an unavailable period (inclusive)
		if !p.To.Valid() || q.Before(p.To) || q == p.To {
			if p.To.Valid() {
				return AvailabilityUnavailableUntil, p.To
			}
			return AvailabilityUnavailableIndefinitely, Date{}
		}
	}

	// All unavailable periods ended before today
	return AvailabilityAvailableIndefinitely, Date{}
}

func (pv Period) DeleteURL() string {
	return fmt.Sprintf("/period/%d/delete", pv.ID)
}
