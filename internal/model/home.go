package model

import (
	"fmt"
	"time"

	"github.com/a-h/templ"
)

type Home struct {
	ID       int32
	Capacity int32
	Name     string
	Note     string

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
	return HomeURL(hv.ID)
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

func AvailabilityDate(unavailablePeriods []Period) (Availability, Date) {
	tomorrow := DateViewFromTime(time.Now().AddDate(0, 0, 1))
	for _, pv := range unavailablePeriods {
		if pv.From.Before(tomorrow) && tomorrow.Before(pv.To) {
			if pv.To.Year > tomorrow.Year+2 {
				return AvailabilityUnavailableIndefinitely, pv.To
			}
			return AvailabilityUnavailableUntil, pv.To
		}
		if tomorrow.Before(pv.From) {
			return AvailabilityAvailableUntil, pv.From
		}
	}
	return AvailabilityAvailableIndefinitely, tomorrow
}
