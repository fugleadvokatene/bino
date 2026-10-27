package language

import (
	"testing"
	"time"

	"github.com/fugleadvokatene/bino/internal/stats"
)

func TestStatsDescription(t *testing.T) {
	from := time.Date(2025, 11, 3, 0, 0, 0, 0, time.Local)
	to := time.Date(2025, 12, 31, 0, 0, 0, 0, time.Local)

	tests := []struct {
		name                         string
		lang                         *Language
		metric                       stats.Metric
		granularity                  stats.Granularity
		species, divisions, outcomes []string
		want                         string
	}{
		{
			"intake, everything",
			EN, stats.MetricIntake, stats.GranularityWeek, nil, nil, nil,
			"Patients taken in per week from week 45, 2025 to week 1, 2026, for all species in all divisions.",
		},
		{
			"outcomes, filtered",
			EN, stats.MetricOutcomes, stats.GranularityMonth, []string{"Mallard", "Herring gull"}, []string{"Oslo"}, []string{"released", "euthanized"},
			"Patients who left rehab (released or euthanized) per month from November 2025 to December 2025, for Mallard and Herring gull in Oslo.",
		},
		{
			"census per week, many species",
			EN, stats.MetricCensus, stats.GranularityWeek, []string{"A", "B", "C", "D", "E"}, nil, nil,
			"Average number of patients in rehab at the end of each day, per week, from week 45, 2025 to week 1, 2026, for A, B, C and 2 more in all divisions.",
		},
		{
			"census per day, Norwegian",
			NO, stats.MetricCensus, stats.GranularityDay, nil, []string{"Oslo", "Viken"}, nil,
			"Pasienter i rehab ved slutten av hver dag fra 3. november 2025 til 31. desember 2025, for alle arter i Oslo og Viken.",
		},
		{
			"intake per week, Norwegian",
			NO, stats.MetricIntake, stats.GranularityWeek, nil, nil, nil,
			"Pasienter tatt inn per uke fra uke 45, 2025 til uke 1, 2026, for alle arter i alle avdelinger.",
		},
		{
			"intake per month, Norwegian",
			NO, stats.MetricIntake, stats.GranularityMonth, nil, nil, nil,
			"Pasienter tatt inn per måned fra november 2025 til desember 2025, for alle arter i alle avdelinger.",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.lang.StatsDescription(tt.metric, tt.granularity, from, to, tt.species, tt.divisions, tt.outcomes)
			if got != tt.want {
				t.Errorf("got  %q\nwant %q", got, tt.want)
			}
		})
	}
}
