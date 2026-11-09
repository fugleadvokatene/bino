package model

import "testing"

func TestCheckinFieldValues(t *testing.T) {
	text := CheckinField{Kind: CheckinFieldKindText, DefaultValue: "garden"}
	box := CheckinField{Kind: CheckinFieldKindCheckbox}
	boxCustom := CheckinField{Kind: CheckinFieldKindCheckbox, DefaultValue: "Ingen merknader"}

	for _, tc := range []struct {
		name      string
		field     CheckinField
		submitted string
		want      string
	}{
		{"text trimmed", text, "  forest ", "forest"},
		{"text empty", text, "", ""},
		{"checkbox ticked", box, "1", "OK"},
		{"checkbox unticked", box, "", ""},
		{"checkbox custom text", boxCustom, "1", "Ingen merknader"},
	} {
		if got := tc.field.ValueFromForm(tc.submitted); got != tc.want {
			t.Errorf("%s: got %q, want %q", tc.name, got, tc.want)
		}
	}

	if got := text.UnfilledValue(); got != "garden" {
		t.Errorf("text UnfilledValue: got %q", got)
	}
	if got := boxCustom.UnfilledValue(); got != "" {
		t.Errorf("checkbox UnfilledValue: got %q, want empty", got)
	}
}
