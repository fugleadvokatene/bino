package templbase

import "github.com/fugleadvokatene/bino/internal/request"

type Option struct {
	Value string
	Label string
	// Options with the same group are shown together under it
	Group string `json:",omitempty"`
}

// SpeciesGroupLabel labels a group from model.GroupSpecies
func SpeciesGroupLabel(data *request.CommonData, group string) string {
	if group == "" {
		return data.Language.DashboardNonPreferredSpecies
	}
	return group
}
