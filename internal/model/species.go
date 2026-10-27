package model

import (
	"cmp"
	"slices"
	"strings"
)

type Species struct {
	ID        int32
	Name      string
	Preferred bool
	// Name of the species group, empty if none
	Group string
}

type SpeciesGroup struct {
	// Empty for species without a group
	Name    string
	Species []Species
}

// GroupSpecies groups species by Group, both sorted by name. Species without a
// group come last.
func GroupSpecies(species []Species) []SpeciesGroup {
	var groups []SpeciesGroup
	for _, s := range species {
		i := slices.IndexFunc(groups, func(g SpeciesGroup) bool { return g.Name == s.Group })
		if i == -1 {
			groups = append(groups, SpeciesGroup{Name: s.Group})
			i = len(groups) - 1
		}
		groups[i].Species = append(groups[i].Species, s)
	}
	for _, g := range groups {
		slices.SortFunc(g.Species, func(a, b Species) int {
			return strings.Compare(strings.ToLower(a.Name), strings.ToLower(b.Name))
		})
	}
	slices.SortFunc(groups, func(a, b SpeciesGroup) int {
		if (a.Name == "") != (b.Name == "") {
			return cmp.Compare(boolInt(a.Name == ""), boolInt(b.Name == ""))
		}
		return strings.Compare(strings.ToLower(a.Name), strings.ToLower(b.Name))
	})
	return groups
}

func boolInt(b bool) int {
	if b {
		return 1
	}
	return 0
}
