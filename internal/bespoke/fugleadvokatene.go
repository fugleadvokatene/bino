package bespoke

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/model"
	"google.golang.org/api/docs/v1"
)

type FugleAdvokatene struct {
	db   *db.Database
	gw   *gdrive.Worker
	lang model.LanguageID
}

func NewFugleAdvokatene(db *db.Database, gw *gdrive.Worker, lang model.LanguageID) FugleAdvokatene {
	return FugleAdvokatene{db: db, gw: gw, lang: lang}
}

func (FugleAdvokatene) Name() string {
	return "FugleAdvokatene"
}

const (
	fieldHeaderDied     = "Avlivet eller dødd (dato):"
	fieldHeaderReleased = "Sluppet fri (dato og sted):"
)

var fieldUpdates = map[model.EventID]string{
	model.EventIDReleased:   fieldHeaderReleased,
	model.EventIDEuthanized: fieldHeaderDied,
	model.EventIDDied:       fieldHeaderDied,
}

func (fa FugleAdvokatene) EditJournalOnEvent(ctx context.Context, patientID int32, eventID model.EventID, note string, t time.Time) {
	fieldHeader, ok := fieldUpdates[eventID]
	if !ok {
		return
	}
	txt := language.GetLanguage(int32(fa.lang)).FormatDateAbs(t)
	if note != "" {
		txt = fmt.Sprintf("%s (%s)", txt, note)
	}
	p, err := fa.db.Q.GetPatient(ctx, patientID)
	if err != nil {
		fa.db.SysLog(ctx, fmt.Sprintf("Could not find patient with ID %d, skipping bespoke actions", patientID), model.SeverityWarn, t)
		return
	}
	googleID := p.GoogleID.String
	if googleID == "" {
		fa.db.SysLog(ctx, fmt.Sprintf("Checked out patient %q with no Google ID, skipping bespoke actions", p.Name), model.SeverityWarn, t)
		return
	}

	go func() {
		doc, err := fa.gw.GetRawDocument(googleID)
		if err != nil {
			fa.db.SysLog(ctx, fmt.Sprintf("Failed to get raw document: %s", err.Error()), model.SeverityError, t)
			return
		}

		// Handle tabs (newer Google Docs structure) vs legacy body
		var body *docs.Body
		if len(doc.Tabs) > 0 {
			body = doc.Tabs[0].DocumentTab.Body
		} else {
			body = doc.Body
		}

		var targetIndex int64 = -1

		// Find the line in the journal containing fieldHeader. Note: it may be partially bolded
		for _, elem := range body.Content {
			if elem.Paragraph == nil {
				continue
			}

			// Reconstruct the full text of the paragraph across all TextRuns
			var paragraphText strings.Builder
			for _, run := range elem.Paragraph.Elements {
				if run.TextRun != nil {
					paragraphText.WriteString(run.TextRun.Content)
				}
			}

			if strings.Contains(paragraphText.String(), fieldHeader) {
				// Paragraphs usually end with a newline character.
				// elem.EndIndex is right after the newline.
				// Subtracting 1 places the insertion point right before the newline at the end of the line.
				targetIndex = elem.EndIndex - 1
				break
			}
		}

		// 2. at the end of that line, insert the given txt
		if targetIndex != -1 {
			err := fa.gw.InsertTextAt(googleID, targetIndex, " "+txt)
			if err != nil {
				fa.db.SysLog(ctx, fmt.Sprintf("Failed to insert text: %s", err.Error()), model.SeverityError, t)
			} else {
				fa.db.SysLog(ctx, fmt.Sprintf("Inserted text %q at index %d", txt, targetIndex), model.SeverityInfo, t)
			}
		}
	}()
}
