package model

import (
	"fmt"
	"strconv"

	"github.com/a-h/templ"
)

const (
	PatientSortFieldCheckinDate = "checkin"
	PatientSortFieldSpecies     = "species"
	PatientSortFieldName        = "name"

	SortDirectionAscending  = "asc"
	SortDirectionDescending = "desc"

	PatientSortModeManual  = "manual"
	PatientSortModeNewest  = "newest"
	PatientSortModeOldest  = "oldest"
	PatientSortModeSpecies = "species"
	PatientSortModeName    = "name"
)

type HomeConfig struct {
	Capacity             int
	TaskManagement       bool
	PatientAutoSort      bool
	PatientSortField     string
	PatientSortDirection string
}

func HomeConfigFromMap(m map[string]string) HomeConfig {
	cfg := HomeConfig{
		PatientSortField:     PatientSortFieldCheckinDate,
		PatientSortDirection: SortDirectionDescending,
	}
	if v, ok := m["capacity"]; ok {
		cfg.Capacity, _ = strconv.Atoi(v)
	}
	cfg.TaskManagement = m["task_management"] == "true"
	cfg.PatientAutoSort = m["patient-auto-sort"] == "true"
	if v, ok := m["patient-sort-field"]; ok {
		cfg.PatientSortField = v
	}
	if v, ok := m["patient-sort-direction"]; ok {
		cfg.PatientSortDirection = v
	}
	return cfg
}

func (cfg HomeConfig) PatientSortMode() string {
	if !cfg.PatientAutoSort {
		return PatientSortModeManual
	}
	switch cfg.PatientSortField {
	case PatientSortFieldSpecies:
		return PatientSortModeSpecies
	case PatientSortFieldName:
		return PatientSortModeName
	default:
		if cfg.PatientSortDirection == SortDirectionAscending {
			return PatientSortModeOldest
		}
		return PatientSortModeNewest
	}
}

type Home struct {
	ID       int32
	Config   HomeConfig
	Name     string
	Note     string
	Division int32

	// Optional
	DivisionName        string
	Patients            []Patient
	PastPatients        []Patient
	Users               []User
	PreferredSpecies    []Species
	NonPreferredSpecies []Species
	UnavailablePeriods  []Period
}

func HomeURL(id int32) templ.SafeURL {
	return templ.URL(fmt.Sprintf("/home/%d", id))
}

func (hv Home) URL() templ.SafeURL {
	if hv.ID > 0 {
		return HomeURL(hv.ID)
	}
	return "#"
}

func (hv Home) URLSuffix(suffix string) string {
	return fmt.Sprintf("/home/%d/%s", hv.ID, suffix)
}

func (h Home) OccupancyClass() string {
	if h.Config.Capacity == 0 {
		return ""
	}
	if len(h.Patients) < h.Config.Capacity {
		return "text-success"
	}
	if len(h.Patients) == h.Config.Capacity {
		return "text-warning"
	}
	return "text-danger"
}
