package main

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"google.golang.org/api/docs/v1"
)

type GDriveJournal struct {
	Item    gdrive.Item
	Content string
}

func (gdj *GDriveJournal) Validate() error {
	errs := []error{}
	for _, k := range enums.TemplateValues() {
		if !strings.Contains(gdj.Content, k.String()) {
			errs = append(errs, fmt.Errorf("template is missing variable '%s'", k))
		}
	}
	return errors.Join(errs...)
}

type GDriveTemplateVars struct {
	Time    time.Time
	Name    string
	Species string
	BinoURL string
}

func (vars *GDriveTemplateVars) Replacement(template enums.Template) string {
	switch template {
	case enums.TemplateYYYY:
		return fmt.Sprintf("%d", vars.Time.Year())
	case enums.TemplateMM:
		return fmt.Sprintf("%02d", vars.Time.Month())
	case enums.TemplateDD:
		return fmt.Sprintf("%02d", vars.Time.Day())
	case enums.TemplateName:
		return vars.Name
	case enums.TemplateSpecies:
		return vars.Species
	case enums.TemplateBinoURL:
		return vars.BinoURL
	default:
		return template.String()
	}
}

func (vars *GDriveTemplateVars) ReplaceRequests() *docs.BatchUpdateDocumentRequest {
	requests := SliceToSlice(enums.TemplateValues(), func(t enums.Template) *docs.Request {
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

func (vars *GDriveTemplateVars) ApplyToString(s string) string {
	for _, t := range enums.TemplateValues() {
		s = strings.ReplaceAll(s, t.String(), vars.Replacement(t))
	}
	return s
}

type GDriveJournalUpdate struct {
	Timestamp time.Time
	Text      string
}

func findAppendIndex(doc []*docs.StructuralElement) int64 {
	const (
		stateFindSectionHeader = 0
		stateFindNextHeader    = 1
	)
	state := stateFindSectionHeader
	var finalIndex int64
	for _, elem := range doc {
		finalIndex = elem.EndIndex

		// Skip if not a paragraph
		if elem.Paragraph == nil {
			continue
		}
		paragraph := elem.Paragraph

		// Skip if not a heading
		pStyle := paragraph.ParagraphStyle
		if pStyle == nil || !strings.HasPrefix(pStyle.NamedStyleType, "HEADING") {
			continue
		}

		// Skip if empty
		if len(paragraph.Elements) == 0 {
			continue
		}
		firstElem := paragraph.Elements[0]

		// Skip if not a text run
		if firstElem.TextRun == nil {
			continue
		}

		// Get heading text
		textRun := strings.TrimSpace(firstElem.TextRun.Content)

		switch state {
		case stateFindSectionHeader:
			if textRun == updatesSectionHeader {
				state = stateFindNextHeader
			}
		case stateFindNextHeader:
			return elem.StartIndex - 1
		}
	}
	return finalIndex
}
