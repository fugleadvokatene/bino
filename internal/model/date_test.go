package model

import (
	"testing"
	"time"
)

func TestAvailabilityDate(t *testing.T) {
	now := time.Now()
	d := func(days int) Date {
		return DateViewFromTime(now.AddDate(0, 0, days))
	}
	indefinite := Date{}

	tests := []struct {
		name     string
		periods  []Period
		wantA    Availability
		wantDate Date
	}{
		{
			"no periods",
			nil,
			AvailabilityAvailableIndefinitely,
			indefinite,
		},
		{
			"future unavailable",
			[]Period{{From: d(5), To: d(10)}},
			AvailabilityAvailableUntil,
			d(5),
		},
		{
			"past unavailable",
			[]Period{{From: d(-10), To: d(-5)}},
			AvailabilityAvailableIndefinitely,
			indefinite,
		},
		{
			"currently unavailable",
			[]Period{{From: d(-1), To: d(5)}},
			AvailabilityUnavailableUntil,
			d(5),
		},
		{
			"currently unavailable indefinitely",
			[]Period{{From: d(-1), To: indefinite}},
			AvailabilityUnavailableIndefinitely,
			indefinite,
		},
		{
			"indefinite period starting in future",
			[]Period{{From: d(5), To: indefinite}},
			AvailabilityAvailableUntil,
			d(5),
		},
		{
			"overlapping periods",
			[]Period{
				{From: d(-2), To: d(3)},
				{From: d(1), To: d(10)},
			},
			AvailabilityUnavailableUntil,
			d(10),
		},
		{
			"gap after current",
			[]Period{
				{From: d(-2), To: d(1)},
				{From: d(5), To: d(7)},
			},
			AvailabilityUnavailableUntil,
			d(1),
		},
		{
			"starts today",
			[]Period{{From: d(0), To: d(5)}},
			AvailabilityUnavailableUntil,
			d(5),
		},
		{
			"ends today inclusive",
			[]Period{{From: d(-5), To: d(0)}},
			AvailabilityUnavailableUntil,
			d(0),
		},
		{
			"ended yesterday",
			[]Period{{From: d(-5), To: d(-1)}},
			AvailabilityAvailableIndefinitely,
			indefinite,
		},
		{
			"future single day",
			[]Period{{From: d(3), To: d(3)}},
			AvailabilityAvailableUntil,
			d(3),
		},
		{
			"single day today",
			[]Period{{From: d(0), To: d(0)}},
			AvailabilityUnavailableUntil,
			d(0),
		},
		{
			"touching periods merge",
			[]Period{
				{From: d(-2), To: d(2)},
				{From: d(2), To: d(5)},
			},
			AvailabilityUnavailableUntil,
			d(5),
		},
		{
			"gap of one day",
			[]Period{
				{From: d(-5), To: d(-2)},
				{From: d(2), To: d(5)},
			},
			AvailabilityAvailableUntil,
			d(2),
		},
		{
			"indefinite current",
			[]Period{{From: d(-1), To: indefinite}},
			AvailabilityUnavailableIndefinitely,
			indefinite,
		},
		{
			"indefinite future",
			[]Period{{From: d(3), To: indefinite}},
			AvailabilityAvailableUntil,
			d(3),
		},
		{
			"finite then indefinite",
			[]Period{
				{From: d(-2), To: d(2)},
				{From: d(3), To: indefinite},
			},
			AvailabilityUnavailableUntil,
			d(2),
		},
		{
			"overlapping finite and indefinite",
			[]Period{
				{From: d(-2), To: d(5)},
				{From: d(3), To: indefinite},
			},
			AvailabilityUnavailableIndefinitely,
			indefinite,
		},
		{
			"unsorted input",
			[]Period{
				{From: d(5), To: d(7)},
				{From: d(-2), To: d(2)},
			},
			AvailabilityUnavailableUntil,
			d(2),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			a, date := AvailabilityDate(tt.periods)
			if a != tt.wantA {
				t.Fatalf("availability = %v, want %v", a, tt.wantA)
			}
			if date != tt.wantDate {
				t.Fatalf("date = %v, want %v", date, tt.wantDate)
			}
		})
	}
}
