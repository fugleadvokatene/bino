package stats

import (
	"reflect"
	"testing"
	"time"

	"github.com/fugleadvokatene/bino/internal/model"
)

var loc = time.FixedZone("test", 3600)

// day returns noon on 2026-01-<d>
func day(d int) time.Time {
	return time.Date(2026, 1, d, 12, 0, 0, 0, loc)
}

func ev(patient, home int32, e model.EventID, t time.Time) Event {
	return Event{PatientID: patient, SpeciesID: 1, HomeID: home, EventID: e, Time: t}
}

func TestBuildStays(t *testing.T) {
	tests := []struct {
		name   string
		events []Event
		want   []Stay
	}{
		{
			"move then release",
			[]Event{
				ev(1, 10, model.EventIDRegistered, day(1)),
				ev(1, 20, model.EventIDTransferredToOtherHome, day(3)),
				ev(1, 20, model.EventIDReleased, day(5)),
			},
			[]Stay{{
				PatientID: 1, SpeciesID: 1, IntakeHomeID: 10, Intake: day(1),
				Intervals:     []Interval{{10, day(1), day(3)}, {20, day(3), day(5)}},
				Outcome:       model.StatusReleased,
				OutcomeHomeID: 20, OutcomeTime: day(5),
			}},
		},
		{
			"still in care",
			[]Event{
				ev(1, 10, model.EventIDRegistered, day(1)),
			},
			[]Stay{{
				PatientID: 1, SpeciesID: 1, IntakeHomeID: 10, Intake: day(1),
				Intervals: []Interval{{10, day(1), time.Time{}}},
				Outcome:   model.StatusAdmitted,
			}},
		},
		{
			"undone checkout continues the stay",
			[]Event{
				ev(1, 10, model.EventIDRegistered, day(1)),
				ev(1, 10, model.EventIDDied, day(2)),
				ev(1, 10, model.EventIDUndidCheckout, day(3)),
				ev(1, 10, model.EventIDReleased, day(4)),
			},
			[]Stay{{
				PatientID: 1, SpeciesID: 1, IntakeHomeID: 10, Intake: day(1),
				Intervals:     []Interval{{10, day(1), day(4)}},
				Outcome:       model.StatusReleased,
				OutcomeHomeID: 10, OutcomeTime: day(4),
			}},
		},
		{
			"duplicate checkout keeps the first",
			[]Event{
				ev(1, 10, model.EventIDRegistered, day(1)),
				ev(1, 10, model.EventIDEuthanized, day(2)),
				ev(1, 0, model.EventIDEuthanized, day(2).Add(time.Minute)),
			},
			[]Stay{{
				PatientID: 1, SpeciesID: 1, IntakeHomeID: 10, Intake: day(1),
				Intervals:     []Interval{{10, day(1), day(2)}},
				Outcome:       model.StatusEuthanized,
				OutcomeHomeID: 10, OutcomeTime: day(2),
			}},
		},
		{
			"deleted after a checkout wins",
			[]Event{
				ev(1, 10, model.EventIDRegistered, day(1)),
				ev(1, 10, model.EventIDReleased, day(2)),
				ev(1, 0, model.EventIDDeleted, day(3)),
			},
			[]Stay{{
				PatientID: 1, SpeciesID: 1, IntakeHomeID: 10, Intake: day(1),
				Intervals:     []Interval{{10, day(1), day(2)}},
				Outcome:       model.StatusDeleted,
				OutcomeHomeID: 10, OutcomeTime: day(2),
			}},
		},
		{
			"move after checkout cancels it",
			[]Event{
				ev(1, 10, model.EventIDRegistered, day(1)),
				ev(1, 10, model.EventIDDied, day(2)),
				ev(1, 20, model.EventIDTransferredToOtherHome, day(3)),
				ev(1, 20, model.EventIDReleased, day(4)),
			},
			[]Stay{{
				PatientID: 1, SpeciesID: 1, IntakeHomeID: 10, Intake: day(1),
				Intervals:     []Interval{{10, day(1), day(3)}, {20, day(3), day(4)}},
				Outcome:       model.StatusReleased,
				OutcomeHomeID: 20, OutcomeTime: day(4),
			}},
		},
		{
			"status changed uses the event's status",
			[]Event{
				ev(1, 10, model.EventIDRegistered, day(1)),
				{PatientID: 1, SpeciesID: 1, HomeID: 10, EventID: model.EventIDStatusChanged, Status: model.StatusAdopted, Time: day(2)},
			},
			[]Stay{{
				PatientID: 1, SpeciesID: 1, IntakeHomeID: 10, Intake: day(1),
				Intervals:     []Interval{{10, day(1), day(2)}},
				Outcome:       model.StatusAdopted,
				OutcomeHomeID: 10, OutcomeTime: day(2),
			}},
		},
		{
			"status changed to a non-checkout status is ignored",
			[]Event{
				ev(1, 10, model.EventIDRegistered, day(1)),
				{PatientID: 1, SpeciesID: 1, HomeID: 10, EventID: model.EventIDStatusChanged, Status: model.StatusAdmitted, Time: day(2)},
			},
			[]Stay{{
				PatientID: 1, SpeciesID: 1, IntakeHomeID: 10, Intake: day(1),
				Intervals: []Interval{{10, day(1), time.Time{}}},
				Outcome:   model.StatusAdmitted,
			}},
		},
		{
			"outcome without intake is skipped",
			[]Event{
				ev(1, 10, model.EventIDReleased, day(1)),
				ev(2, 10, model.EventIDRegistered, day(1)),
			},
			[]Stay{{
				PatientID: 2, SpeciesID: 1, IntakeHomeID: 10, Intake: day(1),
				Intervals: []Interval{{10, day(1), time.Time{}}},
				Outcome:   model.StatusAdmitted,
			}},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := BuildStays(tt.events); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("got  %+v\nwant %+v", got, tt.want)
			}
		})
	}
}

func TestDaily(t *testing.T) {
	stays := BuildStays([]Event{
		// Patient 1: home 10 (division 1) day 1-3, home 20 (division 2) day 3-5, released
		ev(1, 10, model.EventIDRegistered, day(1)),
		ev(1, 20, model.EventIDTransferredToOtherHome, day(3)),
		ev(1, 20, model.EventIDReleased, day(5)),
		// Patient 2: home 10, day 2, still in care
		ev(2, 10, model.EventIDRegistered, day(2)),
		// Patient 3: deleted, never counted
		ev(3, 10, model.EventIDRegistered, day(2)),
		ev(3, 10, model.EventIDDeleted, day(4)),
		// Patient 4: home 10 day 4, died same day
		ev(4, 10, model.EventIDRegistered, day(4)),
		ev(4, 10, model.EventIDDied, day(4).Add(time.Hour)),
	})
	divisions := map[int32]int32{10: 1, 20: 2}
	from := day(1)
	to := day(6)

	type row struct{ intake, outcomes, census int }
	get := func(days []Day) []row {
		var out []row
		for _, d := range days {
			out = append(out, row{d.Intake, d.Outcomes, d.Census})
		}
		return out
	}

	tests := []struct {
		name   string
		filter Filter
		want   []row
	}{
		{
			"all",
			Filter{},
			[]row{{1, 0, 1}, {1, 0, 2}, {0, 0, 2}, {1, 1, 2}, {0, 1, 1}, {0, 0, 1}},
		},
		{
			"division 1",
			Filter{DivisionIDs: []int32{1}},
			[]row{{1, 0, 1}, {1, 0, 2}, {0, 0, 1}, {1, 1, 1}, {0, 0, 1}, {0, 0, 1}},
		},
		{
			"division 2",
			Filter{DivisionIDs: []int32{2}},
			[]row{{0, 0, 0}, {0, 0, 0}, {0, 0, 1}, {0, 0, 1}, {0, 1, 0}, {0, 0, 0}},
		},
		{
			"released only",
			Filter{Outcomes: []model.Status{model.StatusReleased}},
			[]row{{1, 0, 1}, {1, 0, 2}, {0, 0, 2}, {1, 0, 2}, {0, 1, 1}, {0, 0, 1}},
		},
		{
			"other species",
			Filter{SpeciesIDs: []int32{2}},
			[]row{{0, 0, 0}, {0, 0, 0}, {0, 0, 0}, {0, 0, 0}, {0, 0, 0}, {0, 0, 0}},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := get(Daily(stays, divisions, tt.filter, from, to))
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("got  %v\nwant %v", got, tt.want)
			}

			// The observations must add up to the counts
			var want row
			for _, r := range tt.want {
				want.intake += r.intake
				want.outcomes += r.outcomes
				want.census += r.census
			}
			var obs row
			obs.intake = len(Observations(stays, divisions, tt.filter, from, to, MetricIntake))
			obs.outcomes = len(Observations(stays, divisions, tt.filter, from, to, MetricOutcomes))
			for _, o := range Observations(stays, divisions, tt.filter, from, to, MetricCensus) {
				obs.census += o.Days
			}
			if obs != want {
				t.Errorf("observations add up to %v, counts to %v", obs, want)
			}
		})
	}
}

func TestAggregateAndSummarize(t *testing.T) {
	// 2026-01-05 is a Monday
	var days []Day
	for i, census := range []int{3, 5, 4, 4, 4, 4, 4, 6, 2} {
		days = append(days, Day{Date: time.Date(2026, 1, 5+i, 0, 0, 0, 0, loc), Intake: 1, Census: census})
	}

	buckets := Aggregate(days, GranularityWeek)
	if len(buckets) != 2 {
		t.Fatalf("got %d buckets, want 2", len(buckets))
	}
	if buckets[0].Intake != 7 || buckets[0].CensusAvg != 4 || buckets[0].CensusMax != 5 {
		t.Errorf("first week: %+v", buckets[0])
	}
	if buckets[1].Intake != 2 || buckets[1].CensusAvg != 4 || buckets[1].CensusMax != 6 {
		t.Errorf("second week: %+v", buckets[1])
	}

	intake := Summarize(days, buckets, MetricIntake)
	if intake.Total != 9 || intake.Avg != 4.5 || intake.Max != 7 || !intake.MaxAt.Equal(days[0].Date) {
		t.Errorf("intake summary: %+v", intake)
	}

	census := Summarize(days, buckets, MetricCensus)
	if census.Current != 2 || census.Max != 6 || census.Min != 2 || !census.MaxAt.Equal(days[7].Date) {
		t.Errorf("census summary: %+v", census)
	}
}

func TestBucketStart(t *testing.T) {
	sunday := time.Date(2026, 1, 11, 15, 0, 0, 0, loc)
	if got := BucketStart(sunday, GranularityWeek); got.Day() != 5 {
		t.Errorf("week start of Sunday Jan 11: got %v", got)
	}
	if got := BucketStart(sunday, GranularityMonth); got.Day() != 1 {
		t.Errorf("month start: got %v", got)
	}
}

func TestLifecycleEventIDs(t *testing.T) {
	got := LifecycleEventIDs()
	want := []int32{1, 3, 4, 5, 6, 7, 8, 11, 12, 18}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %v, want %v", got, want)
	}
}
