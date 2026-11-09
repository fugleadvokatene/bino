package model

import (
	"fmt"
	"slices"
)

// CheckinField is an optional, admin-defined field on the checkin form. When the
// journal is created from the template, every occurrence of Variable is
// replaced with the submitted value, like the built-in Template variables.
type CheckinField struct {
	ID           int32
	Variable     string
	Label        string
	Kind         CheckinFieldKind
	Options      []string
	DefaultValue string
	SortOrder    int32
}

// FormName is the name (and ID) of the checkin form input for this field.
func (f CheckinField) FormName() string {
	return fmt.Sprintf("checkin-field-%d", f.ID)
}

// HasDefaultOption reports whether the default value is one of the dropdown options.
func (f CheckinField) HasDefaultOption() bool {
	return slices.Contains(f.Options, f.DefaultValue)
}
