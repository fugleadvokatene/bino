package stats

import (
	"slices"
	"sort"
	"time"

	"github.com/fugleadvokatene/bino/internal/model"
)

type Metric string

const (
	MetricIntake   Metric = "intake"
	MetricOutcomes Metric = "outcomes"
	MetricCensus   Metric = "census"
)

type Granularity string

const (
	GranularityDay   Granularity = "day"
	GranularityWeek  Granularity = "week"
	GranularityMonth Granularity = "month"
)

// Filter selects which stays count. Zero values mean no filtering.
// Outcomes only affects MetricOutcomes.
type Filter struct {
	SpeciesIDs  []int32
	DivisionIDs []int32
	Outcomes    []model.Status
}

// Day holds the numbers for one day. Census is the number of patients in care
// at the end of the day.
type Day struct {
	Date     time.Time
	Intake   int
	Outcomes int
	Census   int
}

type Bucket struct {
	Start     time.Time
	Intake    int
	Outcomes  int
	CensusAvg float64
	CensusMax int
}

func (b Bucket) Value(m Metric) float64 {
	switch m {
	case MetricIntake:
		return float64(b.Intake)
	case MetricOutcomes:
		return float64(b.Outcomes)
	default:
		return b.CensusAvg
	}
}

type Summary struct {
	Total   int
	Avg     float64
	Max     int
	MaxAt   time.Time
	Min     int
	MinAt   time.Time
	Current int
}

// BucketStart returns the start of the bucket t falls in. Weeks start on Monday.
func BucketStart(t time.Time, g Granularity) time.Time {
	y, m, d := t.Date()
	switch g {
	case GranularityWeek:
		return time.Date(y, m, d-(int(t.Weekday())+6)%7, 0, 0, 0, 0, t.Location())
	case GranularityMonth:
		return time.Date(y, m, 1, 0, 0, 0, 0, t.Location())
	default:
		return time.Date(y, m, d, 0, 0, 0, 0, t.Location())
	}
}

// window is a range of days and a filter, deciding how each stay counts.
// Days are split at midnight in the location of from.
type window struct {
	// Start of each day, plus the end of the last
	bounds       []time.Time
	n            int
	filter       Filter
	homeDivision map[int32]int32
}

func newWindow(homeDivision map[int32]int32, f Filter, from, to time.Time) window {
	w := window{filter: f, homeDivision: homeDivision}
	for d := BucketStart(from, GranularityDay); !d.After(to); d = d.AddDate(0, 0, 1) {
		w.bounds = append(w.bounds, d)
	}
	w.n = len(w.bounds)
	if w.n > 0 {
		w.bounds = append(w.bounds, w.bounds[w.n-1].AddDate(0, 0, 1))
	}
	return w
}

// Index of the day containing t: -1 if before the range, n if after
func (w window) dayIndex(t time.Time) int {
	return sort.Search(len(w.bounds), func(i int) bool { return w.bounds[i].After(t) }) - 1
}

func (w window) inDivision(homeID int32) bool {
	return len(w.filter.DivisionIDs) == 0 || slices.Contains(w.filter.DivisionIDs, w.homeDivision[homeID])
}

// contribution is how one stay counts towards the daily numbers
type contribution struct {
	// Day index, or -1 if not counted
	intakeDay  int
	outcomeDay int
	// Inclusive day ranges the patient is counted as in care, one per interval
	census []censusRange
}

type censusRange struct {
	first, last int
	homeID      int32
}

func (c contribution) censusDays() int {
	n := 0
	for _, r := range c.census {
		n += r.last - r.first + 1
	}
	return n
}

func (w window) contribution(stay Stay) contribution {
	c := contribution{intakeDay: -1, outcomeDay: -1}
	if stay.Outcome == model.StatusDeleted {
		return c
	}
	f := w.filter
	if len(f.SpeciesIDs) > 0 && !slices.Contains(f.SpeciesIDs, stay.SpeciesID) {
		return c
	}

	if i := w.dayIndex(stay.Intake); i >= 0 && i < w.n && w.inDivision(stay.IntakeHomeID) {
		c.intakeDay = i
	}

	if stay.Outcome != model.StatusAdmitted && w.inDivision(stay.OutcomeHomeID) &&
		(len(f.Outcomes) == 0 || slices.Contains(f.Outcomes, stay.Outcome)) {
		if i := w.dayIndex(stay.OutcomeTime); i >= 0 && i < w.n {
			c.outcomeDay = i
		}
	}

	for _, iv := range stay.Intervals {
		if !w.inDivision(iv.HomeID) {
			continue
		}
		// In care at the end of day i if From <= end of day i < To
		first := max(w.dayIndex(iv.From), 0)
		last := w.n - 1
		if !iv.To.IsZero() {
			last = min(w.dayIndex(iv.To)-1, w.n-1)
		}
		if first <= last {
			c.census = append(c.census, censusRange{first, last, iv.HomeID})
		}
	}
	return c
}

// BucketEnd returns the start of the bucket after the one starting at start
func BucketEnd(start time.Time, g Granularity) time.Time {
	switch g {
	case GranularityWeek:
		return start.AddDate(0, 0, 7)
	case GranularityMonth:
		return start.AddDate(0, 1, 0)
	default:
		return start.AddDate(0, 0, 1)
	}
}

// Daily computes the numbers for each day from from to to, inclusive. Days
// are split at midnight in the location of from.
func Daily(stays []Stay, homeDivision map[int32]int32, f Filter, from, to time.Time) []Day {
	w := newWindow(homeDivision, f, from, to)
	if w.n == 0 {
		return nil
	}

	days := make([]Day, w.n)
	for i := range days {
		days[i].Date = w.bounds[i]
	}

	for _, stay := range stays {
		c := w.contribution(stay)
		if c.intakeDay >= 0 {
			days[c.intakeDay].Intake++
		}
		if c.outcomeDay >= 0 {
			days[c.outcomeDay].Outcomes++
		}
		for _, r := range c.census {
			for i := r.first; i <= r.last; i++ {
				days[i].Census++
			}
		}
	}

	return days
}

// Observation is a stay that went into the counts for a metric.
type Observation struct {
	Stay Stay
	// When it was counted: intake or outcome time. For census, the intake.
	Time time.Time
	// The home it was counted in. For census, the last one.
	HomeID int32
	// For census: the number of days the patient was counted as in care
	Days int
}

// Observations lists the stays behind the numbers from Daily for a metric,
// newest first.
func Observations(stays []Stay, homeDivision map[int32]int32, f Filter, from, to time.Time, m Metric) []Observation {
	w := newWindow(homeDivision, f, from, to)
	var out []Observation
	for _, stay := range stays {
		c := w.contribution(stay)
		switch m {
		case MetricIntake:
			if c.intakeDay >= 0 {
				out = append(out, Observation{Stay: stay, Time: stay.Intake, HomeID: stay.IntakeHomeID})
			}
		case MetricOutcomes:
			if c.outcomeDay >= 0 {
				out = append(out, Observation{Stay: stay, Time: stay.OutcomeTime, HomeID: stay.OutcomeHomeID})
			}
		default:
			if days := c.censusDays(); days > 0 {
				out = append(out, Observation{Stay: stay, Time: stay.Intake, HomeID: c.census[len(c.census)-1].homeID, Days: days})
			}
		}
	}
	slices.SortFunc(out, func(a, b Observation) int {
		return b.Time.Compare(a.Time)
	})
	return out
}

// Aggregate groups days into buckets.
func Aggregate(days []Day, g Granularity) []Bucket {
	var buckets []Bucket
	var nDays int
	for _, d := range days {
		start := BucketStart(d.Date, g)
		if len(buckets) == 0 || !buckets[len(buckets)-1].Start.Equal(start) {
			buckets = append(buckets, Bucket{Start: start})
			nDays = 0
		}
		b := &buckets[len(buckets)-1]
		b.Intake += d.Intake
		b.Outcomes += d.Outcomes
		b.CensusAvg = (b.CensusAvg*float64(nDays) + float64(d.Census)) / float64(nDays+1)
		b.CensusMax = max(b.CensusMax, d.Census)
		nDays++
	}
	return buckets
}

// Summarize computes headline numbers for a metric. Intake and outcomes are
// summarized per bucket; census per day.
func Summarize(days []Day, buckets []Bucket, m Metric) Summary {
	var s Summary
	if len(days) == 0 {
		return s
	}

	if m == MetricCensus {
		s.Current = days[len(days)-1].Census
		s.Max, s.MaxAt = days[0].Census, days[0].Date
		s.Min, s.MinAt = days[0].Census, days[0].Date
		sum := 0
		for _, d := range days {
			sum += d.Census
			if d.Census > s.Max {
				s.Max, s.MaxAt = d.Census, d.Date
			}
			if d.Census < s.Min {
				s.Min, s.MinAt = d.Census, d.Date
			}
		}
		s.Avg = float64(sum) / float64(len(days))
		return s
	}

	for i, b := range buckets {
		v := int(b.Value(m))
		s.Total += v
		if i == 0 || v > s.Max {
			s.Max, s.MaxAt = v, b.Start
		}
	}
	s.Avg = float64(s.Total) / float64(len(buckets))
	return s
}
