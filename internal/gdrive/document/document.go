package document

import (
	"fmt"
	"io"

	"github.com/fugleadvokatene/bino/internal/generic"
	"google.golang.org/api/docs/v1"
)

type Document struct {
	ID         string
	Title      string
	RevisionID string
	Content    []Paragraph
}

func (d *Document) Markdown(w io.Writer) {
	for _, elem := range d.Content {
		elem.Markdown(w)
	}
}

func (d *Document) Images() []*DocImage {
	return generic.Flatten(d.Content, func(in Paragraph) []*DocImage { return in.Images() })
}

func New(doc *docs.Document) (Document, error) {
	if len(doc.Tabs) < 1 {
		return Document{}, fmt.Errorf("document has no tabs")
	}
	tab0 := doc.Tabs[0]
	if tab0 == nil {
		return Document{}, fmt.Errorf("tab 0 is nil")
	}
	docTab := tab0.DocumentTab
	if docTab == nil {
		return Document{}, fmt.Errorf("tab 0 document tab is nil")
	}

	inlineObjects := docTab.InlineObjects

	body := docTab.Body
	if body == nil {
		return Document{}, fmt.Errorf("tab 0 document tab body is nil")
	}
	content := body.Content
	if content == nil {
		return Document{}, fmt.Errorf("tab 0 document tab body content is nil")
	}

	out := Document{
		ID:         doc.DocumentId,
		Title:      doc.Title,
		RevisionID: doc.RevisionId,
		Content:    parseStructuralElements(content, inlineObjects),
	}
	return out, nil
}

func parseStructuralElements(elements []*docs.StructuralElement, inlineObjects map[string]docs.InlineObject) []Paragraph {
	var out []Paragraph
	for _, elem := range elements {
		para := elem.Paragraph
		if para == nil {
			continue
		}
		var newPara Paragraph
		newPara.Elements = parseParagraphElements(para.Elements, inlineObjects)
		if para.Bullet != nil {
			newPara.ListLevel = para.Bullet.NestingLevel + 1
		}
		out = append(out, newPara)
	}
	return out
}

func parseParagraphElements(elements []*docs.ParagraphElement, inlineObjects map[string]docs.InlineObject) []Element {
	var out []Element
	for _, elem := range elements {
		if elem.TextRun != nil {
			out = append(out, parseTextRun(elem.TextRun))
			continue
		}
		if elem.InlineObjectElement != nil {
			if elem := parseInlineObjectElement(elem.InlineObjectElement, inlineObjects); elem != nil {
				out = append(out, *elem)
			}
			continue
		}
		fmt.Printf("non-text and non-inlineobjectelement: %+v", elem)
	}
	return out
}
