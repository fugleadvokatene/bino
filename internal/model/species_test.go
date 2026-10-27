package model

import (
	"reflect"
	"testing"
)

func TestGroupSpecies(t *testing.T) {
	got := GroupSpecies([]Species{
		{ID: 1, Name: "Tårnseiler"},
		{ID: 2, Name: "Svartbak", Group: "Måker"},
		{ID: 3, Name: "Kaie", Group: "Kråkefugler"},
		{ID: 4, Name: "Fiskemåke", Group: "Måker"},
	})
	want := []SpeciesGroup{
		{Name: "Kråkefugler", Species: []Species{{ID: 3, Name: "Kaie", Group: "Kråkefugler"}}},
		{Name: "Måker", Species: []Species{
			{ID: 4, Name: "Fiskemåke", Group: "Måker"},
			{ID: 2, Name: "Svartbak", Group: "Måker"},
		}},
		{Name: "", Species: []Species{{ID: 1, Name: "Tårnseiler"}}},
	}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got  %+v\nwant %+v", got, want)
	}
}
