package gdrive

import (
	"fmt"
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
	default:
		return template.String()
	}
}

func (vars *TemplateVars) ReplaceRequests() *docs.BatchUpdateDocumentRequest {
	requests := generic.SliceToSlice(model.TemplateValues(), func(t model.Template) *docs.Request {
		return &docs.Request{
			ReplaceAllText: &docs.ReplaceAllTextRequest{
				ContainsText: &docs.SubstringMatchCriteria{
					MatchCase: true,
					Text:      t.String(),
				},
				ReplaceText: vars.Replacement(t),
			},
		}
	})

	return &docs.BatchUpdateDocumentRequest{
		Requests: requests,
	}
}

func (vars *TemplateVars) ApplyToString(s string) string {
	for _, t := range model.TemplateValues() {
		s = strings.ReplaceAll(s, t.String(), vars.Replacement(t))
	}
	return s
}
