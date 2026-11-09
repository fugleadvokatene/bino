package handlercheckinfield

import (
	"slices"
	"testing"

	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/model"
)

func TestParseField(t *testing.T) {
	lang := language.GetLanguage(int32(model.LanguageIDEN))
	base := func() map[string]string {
		return map[string]string{
			"variable":   " $Site ",
			"label":      "Release site",
			"kind":       "0",
			"options":    "",
			"default":    "",
			"sort-order": "3",
		}
	}

	t.Run("text", func(t *testing.T) {
		v := base()
		v["options"] = "ignored"
		v["default"] = "garden"
		f, err := parseField(lang, v)
		if err != nil {
			t.Fatal(err)
		}
		if f.Variable != "$Site" || f.Kind != model.CheckinFieldKindText || f.SortOrder != 3 || f.DefaultValue != "garden" || len(f.Options) != 0 {
			t.Fatalf("unexpected field: %+v", f)
		}
	})

	t.Run("dropdown", func(t *testing.T) {
		v := base()
		v["kind"] = "1"
		v["options"] = "a\r\n\n b \na\n"
		v["default"] = "b"
		f, err := parseField(lang, v)
		if err != nil {
			t.Fatal(err)
		}
		if !slices.Equal(f.Options, []string{"a", "b"}) {
			t.Fatalf("unexpected options: %q", f.Options)
		}
	})

	t.Run("checkbox", func(t *testing.T) {
		v := base()
		v["kind"] = "2"
		v["options"] = "ignored"
		v["default"] = "Ingen merknader"
		f, err := parseField(lang, v)
		if err != nil {
			t.Fatal(err)
		}
		if f.Kind != model.CheckinFieldKindCheckbox || len(f.Options) != 0 || f.CheckedValue() != "Ingen merknader" {
			t.Fatalf("unexpected field: %+v", f)
		}
	})

	for name, mutate := range map[string]func(map[string]string){
		"missing variable":    func(v map[string]string) { v["variable"] = "  " },
		"missing label":       func(v map[string]string) { v["label"] = "" },
		"reserved variable":   func(v map[string]string) { v["variable"] = "$YYYY" },
		"no leading $":        func(v map[string]string) { v["variable"] = "Site" },
		"trailing $":          func(v map[string]string) { v["variable"] = "$Site$" },
		"space in variable":   func(v map[string]string) { v["variable"] = "$Release site" },
		"bad kind":            func(v map[string]string) { v["kind"] = "9" },
		"dropdown no options": func(v map[string]string) { v["kind"] = "1" },
		"default not option": func(v map[string]string) {
			v["kind"], v["options"], v["default"] = "1", "a\nb", "c"
		},
	} {
		t.Run(name, func(t *testing.T) {
			v := base()
			mutate(v)
			if _, err := parseField(lang, v); err == nil {
				t.Fatal("expected error")
			}
		})
	}
}
