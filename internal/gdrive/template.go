package gdrive

import (
	"cmp"
	"fmt"
	"maps"
	"slices"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"google.golang.org/api/docs/v1"
)

type TemplateVars struct {
	Time    time.Time
	Name    string
	Species string
	BinoURL string
	// Rehabber is the name of the rehab home the patient was checked in to.
	Rehabber string
	// Extra maps admin-defined variables (see model.CheckinField) to their values.
	Extra map[string]string
}

func (vars *TemplateVars) Replacement(template model.Template) string {
	switch template {
	case model.TemplateYYYY:
		return fmt.Sprintf("%d", vars.Time.Year())
	case model.TemplateMM:
		return fmt.Sprintf("%02d", vars.Time.Month())
	case model.TemplateDD:
		return fmt.Sprintf("%02d", vars.Time.Day())
	case model.TemplateName:
		return vars.Name
	case model.TemplateSpecies:
		return vars.Species
	case model.TemplateBinoURL:
		return vars.BinoURL
	case model.TemplateRehabber:
		return vars.Rehabber
	default:
		return template.String()
	}
}

type replacement struct{ from, to string }

// replacements returns the text replacements to apply, in order:
//
//  1. Every $-token in templateText ("$Name", "$Site", ...), longest
//     first, replaced with the value of the built-in or extra variable of that
//     name, or with nothing if there is no such variable.
//  2. The legacy bare built-ins ("Name", "YYYY", ...), for old templates.
//
// Tokens are taken from the template rather than the filled-in result, so a
// submitted value containing "$" is never stripped.
func (vars *TemplateVars) replacements(templateText string) []replacement {
	values := map[string]string{}
	for _, t := range model.TemplateValues() {
		values[t.String()] = vars.Replacement(t)
	}
	for _, k := range slices.Sorted(maps.Keys(vars.Extra)) {
		name := model.TemplateVariableName(k)
		if _, builtin := values[name]; !builtin {
			values[name] = vars.Extra[k]
		}
	}

	var tokens []string
	for _, token := range model.TemplateTokenPattern.FindAllString(templateText, -1) {
		if !slices.Contains(tokens, token) {
			tokens = append(tokens, token)
		}
	}
	// Longest first, so that e.g. "$Name" doesn't clobber part of "$Names"
	slices.SortFunc(tokens, func(a, b string) int {
		if c := cmp.Compare(len(b), len(a)); c != 0 {
			return c
		}
		return strings.Compare(a, b)
	})

	out := make([]replacement, 0, len(tokens)+len(model.TemplateValues()))
	for _, token := range tokens {
		out = append(out, replacement{token, values[model.TemplateVariableName(token)]})
	}
	for _, t := range model.TemplateValues() {
		out = append(out, replacement{t.String(), vars.Replacement(t)})
	}
	return out
}

// ReplaceRequests fills in all variables in a copy of the template, and removes
// any $-tokens that aren't variables. templateText is the text of the document (see DocumentText).
func (vars *TemplateVars) ReplaceRequests(templateText string) *docs.BatchUpdateDocumentRequest {
	return &docs.BatchUpdateDocumentRequest{
		Requests: generic.SliceToSlice(vars.replacements(templateText), func(r replacement) *docs.Request {
			return &docs.Request{
				ReplaceAllText: &docs.ReplaceAllTextRequest{
					ContainsText: &docs.SubstringMatchCriteria{
						MatchCase: true,
						Text:      r.from,
					},
					ReplaceText: r.to,
				},
			}
		}),
	}
}

// ApplyToString fills in all variables in s and removes any $-tokens that aren't variables.
func (vars *TemplateVars) ApplyToString(s string) string {
	for _, r := range vars.replacements(s) {
		s = strings.ReplaceAll(s, r.from, r.to)
	}
	return s
}

// DocumentText returns all text that ReplaceAllText can reach: the body,
// headers, footers and footnotes of every tab, including inside tables.
// Paragraphs are separated by newlines so tokens never span paragraphs.
func DocumentText(doc *docs.Document) string {
	var sb strings.Builder
	var walkContent func(content []*docs.StructuralElement)
	walkContent = func(content []*docs.StructuralElement) {
		for _, se := range content {
			switch {
			case se.Paragraph != nil:
				for _, pe := range se.Paragraph.Elements {
					if pe.TextRun != nil {
						sb.WriteString(pe.TextRun.Content)
					}
				}
				sb.WriteString("\n")
			case se.Table != nil:
				for _, row := range se.Table.TableRows {
					for _, cell := range row.TableCells {
						walkContent(cell.Content)
					}
				}
			case se.TableOfContents != nil:
				walkContent(se.TableOfContents.Content)
			}
		}
	}
	walkParts := func(body *docs.Body, headers map[string]docs.Header, footers map[string]docs.Footer, footnotes map[string]docs.Footnote) {
		if body != nil {
			walkContent(body.Content)
		}
		for _, h := range headers {
			walkContent(h.Content)
		}
		for _, f := range footers {
			walkContent(f.Content)
		}
		for _, f := range footnotes {
			walkContent(f.Content)
		}
	}
	var walkTabs func(tabs []*docs.Tab)
	walkTabs = func(tabs []*docs.Tab) {
		for _, tab := range tabs {
			if dt := tab.DocumentTab; dt != nil {
				walkParts(dt.Body, dt.Headers, dt.Footers, dt.Footnotes)
			}
			walkTabs(tab.ChildTabs)
		}
	}

	if len(doc.Tabs) > 0 {
		walkTabs(doc.Tabs)
	} else {
		walkParts(doc.Body, doc.Headers, doc.Footers, doc.Footnotes)
	}
	return sb.String()
}
