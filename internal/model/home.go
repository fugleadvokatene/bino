package model

import (
	"fmt"
	"strconv"

	"github.com/a-h/templ"
)

type HomeConfig struct {
	Capacity       int
	TaskManagement bool
}

func HomeConfigFromMap(m map[string]string) HomeConfig {
	cfg := HomeConfig{}
	if v, ok := m["capacity"]; ok {
		cfg.Capacity, _ = strconv.Atoi(v)
	}
	cfg.TaskManagement = m["task_management"] == "true"
	return cfg
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
