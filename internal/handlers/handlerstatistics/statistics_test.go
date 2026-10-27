package handlerstatistics

import (
	"testing"
	"time"
)

func TestParseDate(t *testing.T) {
	loc, err := time.LoadLocation("Europe/Oslo")
	if err != nil {
		t.Fatal(err)
	}
	fallback := time.Date(2000, 1, 1, 0, 0, 0, 0, loc)
	date := func(y int, m time.Month, d int) time.Time {
		return time.Date(y, m, d, 0, 0, 0, 0, loc)
	}

	tests := []struct {
		in   string
		end  bool
		want time.Time
	}{
		{"2026-01-01", false, date(2026, 1, 1)},
		// Week 1 of 2026 starts on Monday December 29th 2025
		{"2026-W01", false, date(2025, 12, 29)},
		{"2026-W01", true, date(2026, 1, 4)},
		{"2026-W53", false, date(2026, 12, 28)},
		{"2026-02", false, date(2026, 2, 1)},
		{"2026-02", true, date(2026, 2, 28)},
		{"nonsense", false, fallback},
		{"2026-W60", false, fallback},
	}
	for _, tt := range tests {
		if got := parseDate(tt.in, fallback, tt.end, loc); !got.Equal(tt.want) {
			t.Errorf("parseDate(%q, end=%v) = %v, want %v", tt.in, tt.end, got, tt.want)
		}
	}

	// Midnight is in the given location, not UTC
	if got := parseDate("2026-03-01", fallback, false, loc); got.UTC().Hour() != 23 {
		t.Errorf("2026-03-01 in Oslo should be 23:00 UTC the day before, got %v", got.UTC())
	}

	// Formatting round-trips
	for _, in := range []string{"2026-W01", "2025-W52", "2026-W43"} {
		got, _ := parseISOWeek(in, loc)
		if out := formatISOWeek(got); out != in {
			t.Errorf("%q round-tripped to %q", in, out)
		}
	}
}
