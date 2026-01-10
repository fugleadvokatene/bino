package model

import (
	"fmt"

	"github.com/a-h/templ"
)

type Home struct {
	ID       int32
	Capacity int32
	Name     string
	Note     string
	Division int32

	// Optional
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
	if len(h.Patients) < int(h.Capacity) {
		return "text-success"
	}
	if len(h.Patients) == int(h.Capacity) {
		return "text-warning"
	}
	return "text-danger"
}
