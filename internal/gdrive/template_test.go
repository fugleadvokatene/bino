package gdrive

import (
	"testing"
	"time"
)

func TestTemplateVarsExtra(t *testing.T) {
	vars := TemplateVars{
		Time:     time.Date(2026, 11, 9, 0, 0, 0, 0, time.UTC),
		Name:     "Kåre",
		Species:  "Kaie",
		Rehabber: "Heimen",
		Extra:    map[string]string{"$Site$": "Hagen", "$Finder$": ""},
	}

	got := vars.ApplyToString("YYYY-MM-DD Name @ Rehabber ($Site$; $Finder$)")
	if want := "2026-11-09 Kåre @ Heimen (Hagen; )"; got != want {
		t.Fatalf("ApplyToString: got %q, want %q", got, want)
	}

	replaced := map[string]string{}
	for _, req := range vars.ReplaceRequests().Requests {
		replaced[req.ReplaceAllText.ContainsText.Text] = req.ReplaceAllText.ReplaceText
	}
	if replaced["$Site$"] != "Hagen" || replaced["Name"] != "Kåre" {
		t.Fatalf("ReplaceRequests missing replacements: %v", replaced)
	}
	if v, ok := replaced["$Finder$"]; !ok || v != "" {
		t.Fatalf("empty extra var should replace with empty string, got %q (present=%t)", v, ok)
	}
}
