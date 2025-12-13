package view

import (
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
