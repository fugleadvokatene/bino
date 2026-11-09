package model

import (
	"fmt"
	"slices"
	"strings"
)

// DefaultCheckedValue is inserted for a ticked checkbox without its own text.
const DefaultCheckedValue = "OK"

// CheckinField is an optional, admin-defined field on the checkin form. When the
// journal is created from the template, every occurrence of Variable is
// replaced with the submitted value, like the built-in Template variables.
type CheckinField struct {
	ID           int32
	Variable     string
	Label        string
	Kind         CheckinFieldKind
	Options      []string
	// DefaultValue is the initial value for text and dropdown fields. For
	// checkboxes it is the text inserted when ticked (see CheckedValue);
	// checkboxes always start unticked.
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

// CheckedValue is the text inserted for a ticked checkbox.
func (f CheckinField) CheckedValue() string {
	if f.DefaultValue != "" {
		return f.DefaultValue
	}
	return DefaultCheckedValue
}

// ValueFromForm turns the submitted form value into the value to insert in the
// journal. Unsubmitted fields (and unticked checkboxes) arrive as "".
func (f CheckinField) ValueFromForm(submitted string) string {
	if f.Kind == CheckinFieldKindCheckbox {
		if submitted == "" {
			return ""
		}
		return f.CheckedValue()
	}
	return strings.TrimSpace(submitted)
}

// UnfilledValue is the value used when the journal is created without the
// checkin form: the default for text and dropdown, nothing for checkboxes.
func (f CheckinField) UnfilledValue() string {
	if f.Kind == CheckinFieldKindCheckbox {
		return ""
	}
	return f.DefaultValue
}
