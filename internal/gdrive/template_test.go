package gdrive

import (
	"slices"
	"testing"
	"time"

	"github.com/fugleadvokatene/bino/internal/model"
	"google.golang.org/api/docs/v1"
)

func testVars() TemplateVars {
	return TemplateVars{
		Time:     time.Date(2026, 11, 9, 0, 0, 0, 0, time.UTC),
		Name:     "Kåre",
		Species:  "Kaie",
		Rehabber: "Heimen",
		Extra: map[string]string{
			"$Site":     "Hagen",
			"$SiteName": "Bakken",
			"$Finder":   "",
			"$Weight":   "costs $5 and $Unknown", // values are never stripped
		},
	}
}

func TestApplyToString(t *testing.T) {
	vars := testVars()
	for in, want := range map[string]string{
		"$YYYY-$MM-$DD $Name @ $Rehabber ($Species)": "2026-11-09 Kåre @ Heimen (Kaie)",
		"Legacy: YYYY-MM-DD Name @ Rehabber":         "Legacy: 2026-11-09 Kåre @ Heimen",
		"$Site / $SiteName / $Finder / $Weight":      "Hagen / Bakken /  / costs $5 and $Unknown",
		"Gone: $Unknown, $also_gone, $Ærfugl2.":      "Gone: , , .",
		"$Names is not $Name":                        " is not Kåre",
		"Lone $ and $ 5 are kept":                    "Lone $ and $ 5 are kept",
	} {
		if got := vars.ApplyToString(in); got != want {
			t.Errorf("ApplyToString(%q)\n got %q\nwant %q", in, got, want)
		}
	}
}

func TestReplaceRequests(t *testing.T) {
	vars := testVars()
	reqs := vars.ReplaceRequests("$Name $Site $Unknown $Unknown $Names")

	var order []string
	replaced := map[string]string{}
	for _, req := range reqs.Requests {
		from := req.ReplaceAllText.ContainsText.Text
		order = append(order, from)
		replaced[from] = req.ReplaceAllText.ReplaceText
	}
	// $-tokens from the template, longest first, then the legacy bare names
	wantPrefix := []string{"$Unknown", "$Names", "$Name", "$Site"}
	if !slices.Equal(order[:len(wantPrefix)], wantPrefix) {
		t.Fatalf("unexpected order: %v", order)
	}
	if replaced["$Name"] != "Kåre" || replaced["$Site"] != "Hagen" || replaced["$Unknown"] != "" || replaced["$Names"] != "" {
		t.Fatalf("unexpected replacements: %v", replaced)
	}
	if replaced["Name"] != "Kåre" || replaced["Rehabber"] != "Heimen" {
		t.Fatalf("missing legacy replacements: %v", replaced)
	}
	if len(order) != len(replaced) {
		t.Fatalf("duplicate requests: %v", order)
	}
}

func TestDocumentText(t *testing.T) {
	para := func(runs ...string) *docs.StructuralElement {
		p := &docs.Paragraph{}
		for _, r := range runs {
			p.Elements = append(p.Elements, &docs.ParagraphElement{TextRun: &docs.TextRun{Content: r}})
		}
		return &docs.StructuralElement{Paragraph: p}
	}
	doc := &docs.Document{Tabs: []*docs.Tab{{
		DocumentTab: &docs.DocumentTab{
			Body: &docs.Body{Content: []*docs.StructuralElement{
				para("Hello $Bo", "ld split across runs"),
				{Table: &docs.Table{TableRows: []*docs.TableRow{{
					TableCells: []*docs.TableCell{{Content: []*docs.StructuralElement{para("$InTable")}}},
				}}}},
			}},
			Headers: map[string]docs.Header{"h": {Content: []*docs.StructuralElement{para("$InHeader")}}},
		},
		ChildTabs: []*docs.Tab{{DocumentTab: &docs.DocumentTab{
			Body: &docs.Body{Content: []*docs.StructuralElement{para("$InChildTab")}},
		}}},
	}}}

	got := model.TemplateTokenPattern.FindAllString(DocumentText(doc), -1)
	want := map[string]bool{"$Bold": true, "$InTable": true, "$InHeader": true, "$InChildTab": true}
	if len(got) != len(want) {
		t.Fatalf("got tokens %q", got)
	}
	for _, tok := range got {
		if !want[tok] {
			t.Fatalf("unexpected token %q in %q", tok, got)
		}
	}
}
