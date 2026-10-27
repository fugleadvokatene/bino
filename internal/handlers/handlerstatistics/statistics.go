package handlerstatistics

import (
	"context"
	"fmt"
	"math"
	"net/http"
	"net/url"
	"slices"
	"strconv"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/stats"
)

const (
	dateFormat  = "2006-01-02"
	monthFormat = "2006-01"
	maxYears    = 10
)

type page struct {
	DB *db.Database
	// Days are split at midnight here
	Location *time.Location
}

// Times are Unix milliseconds, as Chart.js wants them
type chartPoint struct {
	// Middle of the bucket
	Time  int64
	Value float64
	// Name of the bucket, e.g. "Week 45, 2025"
	Label string
}

type chartData struct {
	Label string
	Unit  stats.Granularity
	// Fill under the line. Not for census: the area under it would suggest a
	// total, but census values can't be summed over time.
	Fill   bool
	Points []chartPoint
	// Start of the first bucket and end of the last, so the chart can draw
	// their full width
	Start int64
	End   int64
}

// selection is a checkbox group with an "all" checkbox. The form always
// sends name=0, so unchecking everything can be told apart from a fresh visit.
type selection struct {
	All bool
	IDs []int32
}

func parseSelection(q url.Values, name string) selection {
	values, ok := q[name]
	if !ok || slices.Contains(values, "all") {
		return selection{All: true}
	}
	return selection{IDs: parseIDs(values)}
}

func (s selection) Empty() bool {
	return !s.All && len(s.IDs) == 0
}

func (s selection) Checked(id int32) bool {
	return s.All || slices.Contains(s.IDs, id)
}

// Filter returns the IDs to filter on, empty meaning all
func (s selection) Filter() []int32 {
	if s.All {
		return nil
	}
	return s.IDs
}

type option struct {
	ID   int32
	Name string
}

type speciesGroupNode struct {
	option
	Species []option
}

// observationRow is a patient behind the numbers, see stats.Observations
type observationRow struct {
	PatientID   int32
	Name        string
	Species     string
	Home        string
	Intake      time.Time
	OutcomeTime time.Time
	Outcome     model.Status
	// Census only
	Days int
}

type viewData struct {
	Metric      stats.Metric
	Granularity stats.Granularity
	From        time.Time
	To          time.Time
	Species     selection
	// Checked species groups, unless Species.All
	SpeciesGroups []int32
	Divisions     selection
	// Only applies to MetricOutcomes
	Outcomes selection
	Filter   stats.Filter

	// All species, sorted by name
	SpeciesOptions   []option
	SpeciesTree      []speciesGroupNode
	UngroupedSpecies []option
	DivisionOptions  []option
	OutcomeOptions   []option

	Description  string
	Days         []stats.Day
	Observations []observationRow
	Buckets      []stats.Bucket
	Summary      stats.Summary
	Chart        chartData
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	commonData.Subtitle = commonData.Language.StatsTitle

	v := parseQuery(r, h.Location)

	stays, err := h.DB.GetStays(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homes, err := h.DB.Q.GetHomesIncludingArchived(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	homeDivision := make(map[int32]int32, len(homes))
	for _, home := range homes {
		homeDivision[home.ID] = home.Division
	}

	divisions, err := h.DB.GetDivisions(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	for _, d := range divisions {
		v.DivisionOptions = append(v.DivisionOptions, option{ID: d.ID, Name: d.Name})
	}

	species, err := h.DB.Q.GetSpeciesWithLanguage(ctx, commonData.Lang32())
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	groupOf := make(map[int32]int32, len(species))
	for _, s := range species {
		v.SpeciesOptions = append(v.SpeciesOptions, option{ID: s.SpeciesID, Name: s.Name})
		groupOf[s.SpeciesID] = s.GroupID.Int32
	}
	slices.SortFunc(v.SpeciesOptions, byName)
	groups, err := h.DB.Q.GetSpeciesGroupsWithLanguage(ctx, commonData.Lang32())
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	for _, g := range groups {
		node := speciesGroupNode{option: option{ID: g.GroupID, Name: g.Name}}
		for _, s := range v.SpeciesOptions {
			if groupOf[s.ID] == g.GroupID {
				node.Species = append(node.Species, s)
			}
		}
		v.SpeciesTree = append(v.SpeciesTree, node)
	}
	slices.SortFunc(v.SpeciesTree, func(a, b speciesGroupNode) int { return byName(a.option, b.option) })
	for _, s := range v.SpeciesOptions {
		if groupOf[s.ID] == 0 {
			v.UngroupedSpecies = append(v.UngroupedSpecies, s)
		}
	}

	// Checked groups stand for all their species
	if !v.Species.All {
		v.Filter.SpeciesIDs = slices.Clone(v.Species.IDs)
		for _, s := range v.SpeciesOptions {
			if slices.Contains(v.SpeciesGroups, groupOf[s.ID]) && !slices.Contains(v.Filter.SpeciesIDs, s.ID) {
				v.Filter.SpeciesIDs = append(v.Filter.SpeciesIDs, s.ID)
			}
		}
	}

	for _, s := range []model.Status{
		model.StatusReleased,
		model.StatusDead,
		model.StatusEuthanized,
		model.StatusTransferredOutsideOrganization,
		model.StatusAdopted,
	} {
		v.OutcomeOptions = append(v.OutcomeOptions, option{ID: int32(s), Name: commonData.Language.Status[s]})
	}

	if (!v.Species.All && len(v.Filter.SpeciesIDs) == 0) || v.Divisions.Empty() ||
		(v.Metric == stats.MetricOutcomes && v.Outcomes.Empty()) {
		render(w, r, commonData, v)
		return
	}

	// The future has no data
	end := v.To
	if today := stats.BucketStart(time.Now().In(h.Location), stats.GranularityDay); end.After(today) {
		end = today
	}
	v.Days = stats.Daily(stays, homeDivision, v.Filter, v.From, end)
	if v.Observations, err = h.observationRows(ctx, stays, homeDivision, homes, v, end); err != nil {
		handlererror.Error(w, r, err)
		return
	}
	v.Description = describe(commonData.Language, v)
	v.Buckets = stats.Aggregate(v.Days, v.Granularity)
	v.Summary = stats.Summarize(v.Days, v.Buckets, v.Metric)
	v.Chart = chartData{
		Label: metricName(commonData.Language, v.Metric),
		Unit:  v.Granularity,
		Fill:  v.Metric != stats.MetricCensus,
	}
	if n := len(v.Buckets); n > 0 {
		v.Chart.Start = v.Buckets[0].Start.UnixMilli()
		v.Chart.End = stats.BucketEnd(v.Buckets[n-1].Start, v.Granularity).UnixMilli()
	}
	for _, b := range v.Buckets {
		end := stats.BucketEnd(b.Start, v.Granularity)
		v.Chart.Points = append(v.Chart.Points, chartPoint{
			Time:  b.Start.Add(end.Sub(b.Start) / 2).UnixMilli(),
			Value: math.Round(b.Value(v.Metric)),
			Label: bucketLabel(commonData.Language, b.Start, v.Granularity),
		})
	}

	render(w, r, commonData, v)
}

// htmx requests from the form only need the results. History restores
// (back button with an empty htmx cache) need the whole page.
func render(w http.ResponseWriter, r *http.Request, commonData *request.CommonData, v viewData) {
	if r.Header.Get("HX-Request") == "true" && r.Header.Get("HX-History-Restore-Request") != "true" {
		StatisticsLive(commonData, v).Render(r.Context(), w)
		return
	}
	StatisticsPage(commonData, v).Render(r.Context(), w)
}

func (h *page) observationRows(
	ctx context.Context,
	stays []stats.Stay,
	homeDivision map[int32]int32,
	homes []sql.Home,
	v viewData,
	end time.Time,
) ([]observationRow, error) {
	observations := stats.Observations(stays, homeDivision, v.Filter, v.From, end, v.Metric)

	ids := make([]int32, len(observations))
	for i, o := range observations {
		ids[i] = o.Stay.PatientID
	}
	names, err := h.DB.Q.GetPatientNames(ctx, ids)
	if err != nil {
		return nil, err
	}
	nameByID := make(map[int32]string, len(names))
	for _, n := range names {
		nameByID[n.ID] = n.Name
	}
	homeByID := make(map[int32]string, len(homes))
	for _, home := range homes {
		homeByID[home.ID] = home.Name
	}
	speciesByID := make(map[int32]string, len(v.SpeciesOptions))
	for _, s := range v.SpeciesOptions {
		speciesByID[s.ID] = s.Name
	}

	rows := make([]observationRow, len(observations))
	for i, o := range observations {
		rows[i] = observationRow{
			PatientID:   o.Stay.PatientID,
			Name:        nameByID[o.Stay.PatientID],
			Species:     speciesByID[o.Stay.SpeciesID],
			Home:        homeByID[o.HomeID],
			Intake:      o.Stay.Intake.In(h.Location),
			OutcomeTime: o.Stay.OutcomeTime.In(h.Location),
			Outcome:     o.Stay.Outcome,
			Days:        o.Days,
		}
	}
	return rows, nil
}

func describe(l *language.Language, v viewData) string {
	var outcomes []string
	if v.Metric == stats.MetricOutcomes {
		for _, name := range selectedNames(v.Outcomes, v.OutcomeOptions) {
			outcomes = append(outcomes, strings.ToLower(name))
		}
	}
	return l.StatsDescription(
		v.Metric,
		v.Granularity,
		v.From,
		v.To,
		selectedSpeciesNames(v),
		selectedNames(v.Divisions, v.DivisionOptions),
		outcomes,
	)
}

// selectedSpeciesNames names checked groups, then species not in those
func selectedSpeciesNames(v viewData) []string {
	if v.Species.All {
		return nil
	}
	var names []string
	covered := map[int32]bool{}
	for _, g := range v.SpeciesTree {
		if slices.Contains(v.SpeciesGroups, g.ID) {
			names = append(names, g.Name)
			for _, s := range g.Species {
				covered[s.ID] = true
			}
		}
	}
	for _, s := range v.SpeciesOptions {
		if slices.Contains(v.Species.IDs, s.ID) && !covered[s.ID] {
			names = append(names, s.Name)
		}
	}
	return names
}

func (v viewData) speciesGroupChecked(groupID int32) bool {
	return v.Species.All || slices.Contains(v.SpeciesGroups, groupID)
}

// speciesChecked reports whether a species checkbox is checked; groupID is 0
// for species without a group
func (v viewData) speciesChecked(speciesID, groupID int32) bool {
	return v.Species.Checked(speciesID) || (groupID != 0 && v.speciesGroupChecked(groupID))
}

func (v viewData) speciesDisabled(groupID int32) bool {
	return v.Species.All || (groupID != 0 && v.speciesGroupChecked(groupID))
}

func byName(a, b option) int {
	return strings.Compare(strings.ToLower(a.Name), strings.ToLower(b.Name))
}

// selectedNames returns the names of the selected options, or nil if all are
func selectedNames(sel selection, options []option) []string {
	if sel.All {
		return nil
	}
	var names []string
	for _, o := range options {
		if slices.Contains(sel.IDs, o.ID) {
			names = append(names, o.Name)
		}
	}
	return names
}

func parseQuery(r *http.Request, loc *time.Location) viewData {
	q := r.URL.Query()
	v := viewData{
		Metric:      stats.MetricIntake,
		Granularity: stats.GranularityMonth,
	}

	switch m := stats.Metric(q.Get("metric")); m {
	case stats.MetricIntake, stats.MetricOutcomes, stats.MetricCensus:
		v.Metric = m
	}
	switch g := stats.Granularity(q.Get("granularity")); g {
	case stats.GranularityDay, stats.GranularityWeek, stats.GranularityMonth:
		v.Granularity = g
	}

	// Defaults to the current year
	today := stats.BucketStart(time.Now().In(loc), stats.GranularityDay)
	v.To = parseDate(q.Get("to"), time.Date(today.Year(), 12, 31, 0, 0, 0, 0, loc), true, loc)
	v.From = parseDate(q.Get("from"), time.Date(today.Year(), 1, 1, 0, 0, 0, 0, loc), false, loc)
	if v.From.After(v.To) {
		v.From, v.To = v.To, v.From
	}
	// One entry is computed per day, so keep the range sane
	if limit := v.To.AddDate(-maxYears, 0, 0); v.From.Before(limit) {
		v.From = limit
	}
	// Whole buckets only, so the first and last aren't misleadingly small.
	// This also matches what the week and month pickers show. The current
	// bucket is still partial, as the data stops at today.
	v.From = stats.BucketStart(v.From, v.Granularity)
	v.To = stats.BucketEnd(stats.BucketStart(v.To, v.Granularity), v.Granularity).AddDate(0, 0, -1)

	v.Species = parseSelection(q, "species")
	v.Divisions = parseSelection(q, "division")
	if !v.Species.All {
		v.SpeciesGroups = parseIDs(q["species_group"])
	}
	v.Filter.DivisionIDs = v.Divisions.Filter()
	v.Outcomes = parseSelection(q, "outcome")
	for _, id := range v.Outcomes.Filter() {
		v.Filter.Outcomes = append(v.Filter.Outcomes, model.Status(id))
	}

	return v
}

// parseDate accepts a date, or a week or month (from the week and month
// pickers), which means its first day, or its last if end is set.
func parseDate(s string, fallback time.Time, end bool, loc *time.Location) time.Time {
	if t, err := time.ParseInLocation(dateFormat, s, loc); err == nil {
		return t
	}
	if t, ok := parseISOWeek(s, loc); ok {
		if end {
			return t.AddDate(0, 0, 6)
		}
		return t
	}
	if t, err := time.ParseInLocation(monthFormat, s, loc); err == nil {
		if end {
			return t.AddDate(0, 1, -1)
		}
		return t
	}
	return fallback
}

// parseISOWeek parses a week picker value like 2026-W01 into the Monday it
// starts on
func parseISOWeek(s string, loc *time.Location) (time.Time, bool) {
	var year, week int
	if n, err := fmt.Sscanf(s, "%4d-W%2d", &year, &week); err != nil || n != 2 || week < 1 || week > 53 {
		return time.Time{}, false
	}
	// January 4th is always in week 1
	jan4 := time.Date(year, 1, 4, 0, 0, 0, 0, loc)
	return stats.BucketStart(jan4, stats.GranularityWeek).AddDate(0, 0, 7*(week-1)), true
}

func formatISOWeek(t time.Time) string {
	year, week := t.ISOWeek()
	return fmt.Sprintf("%04d-W%02d", year, week)
}

// dateInputValue formats t for the picker matching the granularity
func dateInputValue(t time.Time, g stats.Granularity) string {
	switch g {
	case stats.GranularityWeek:
		return formatISOWeek(t)
	case stats.GranularityMonth:
		return t.Format(monthFormat)
	default:
		return t.Format(dateFormat)
	}
}

func dateInputType(g stats.Granularity) string {
	switch g {
	case stats.GranularityWeek:
		return "week"
	case stats.GranularityMonth:
		return "month"
	default:
		return "date"
	}
}

func parseIDs(values []string) []int32 {
	var out []int32
	for _, s := range values {
		if id, err := strconv.ParseInt(s, 10, 32); err == nil && id != 0 {
			out = append(out, int32(id))
		}
	}
	return out
}

func metricName(l *language.Language, m stats.Metric) string {
	switch m {
	case stats.MetricIntake:
		return l.StatsIntake
	case stats.MetricOutcomes:
		return l.StatsOutcomes
	default:
		return l.StatsCensus
	}
}

func granularityName(l *language.Language, g stats.Granularity) string {
	switch g {
	case stats.GranularityDay:
		return l.StatsDay
	case stats.GranularityMonth:
		return l.StatsMonth
	default:
		return l.StatsWeek
	}
}

func bucketLabel(l *language.Language, t time.Time, g stats.Granularity) string {
	switch g {
	case stats.GranularityWeek:
		year, week := t.ISOWeek()
		return fmt.Sprintf("%s %d, %d", l.StatsWeek, week, year)
	case stats.GranularityMonth:
		return fmt.Sprintf("%s %d", l.Months[t.Month()], t.Year())
	default:
		return l.FormatDateAbs(t)
	}
}

func formatRounded(v float64) string {
	return strconv.Itoa(int(math.Round(v)))
}
