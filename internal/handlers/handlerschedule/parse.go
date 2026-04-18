package handlerschedule

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

func parseDatetimeLocal(s string) (pgtype.Timestamptz, error) {
	t, err := time.ParseInLocation("2006-01-02T15:04", s, time.Local)
	if err != nil {
		return pgtype.Timestamptz{}, err
	}
	return pgtype.Timestamptz{Time: t, Valid: true}, nil
}

func ParseIntervalFromForm(intervalType, amount, unit string) (morningEvening bool, intervalHours pgtype.Int4) {
	return parseIntervalFromForm(intervalType, amount, unit)
}

func ParseEndFromForm(endType, countStr, dateStr string) (remainingCount pgtype.Int4, endDate pgtype.Timestamptz) {
	return parseEndFromForm(endType, countStr, dateStr)
}

func parseIntervalFromForm(intervalType, amount, unit string) (morningEvening bool, intervalHours pgtype.Int4) {
	switch strings.TrimSpace(intervalType) {
	case "morning_evening":
		return true, pgtype.Int4{Valid: false}
	case "repeat":
		n, err := strconv.ParseInt(strings.TrimSpace(amount), 10, 32)
		if err != nil || n <= 0 {
			return false, pgtype.Int4{Valid: false}
		}
		if strings.TrimSpace(unit) == "days" {
			n *= 24
		}
		return false, pgtype.Int4{Int32: int32(n), Valid: true}
	default:
		return false, pgtype.Int4{Valid: false}
	}
}

func parseEndFromForm(endType, countStr, dateStr string) (remainingCount pgtype.Int4, endDate pgtype.Timestamptz) {
	switch strings.TrimSpace(endType) {
	case "count":
		n, err := strconv.ParseInt(strings.TrimSpace(countStr), 10, 32)
		if err != nil || n <= 0 {
			return pgtype.Int4{}, pgtype.Timestamptz{}
		}
		return pgtype.Int4{Int32: int32(n), Valid: true}, pgtype.Timestamptz{}
	case "date":
		t, err := parseDatetimeLocal(dateStr)
		if err != nil {
			return pgtype.Int4{}, pgtype.Timestamptz{}
		}
		return pgtype.Int4{}, t
	default:
		return pgtype.Int4{}, pgtype.Timestamptz{}
	}
}

func NextMorningEvening(from time.Time) time.Time {
	return nextMorningEvening(from)
}

func nextMorningEvening(from time.Time) time.Time {
	local := from.In(time.Local)
	y, m, d := local.Date()
	morning := time.Date(y, m, d, 9, 0, 0, 0, time.Local)
	evening := time.Date(y, m, d, 21, 0, 0, 0, time.Local)
	if local.Before(morning) {
		return morning
	}
	if local.Before(evening) {
		return evening
	}
	return time.Date(y, m, d+1, 9, 0, 0, 0, time.Local)
}

func endCountValue(count pgtype.Int4) string {
	if !count.Valid {
		return "3"
	}
	return fmt.Sprintf("%d", count.Int32)
}

func formatEndDateForInput(t pgtype.Timestamptz) string {
	if !t.Valid || t.Time.IsZero() {
		return ""
	}
	return t.Time.Format("2006-01-02T15:04")
}
