package document

import (
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"strings"

	"github.com/fugleadvokatene/bino/internal/generic"
	"google.golang.org/api/docs/v1"
)

type Document struct {
	ID         string
	Title      string
	RevisionID string
	Content    []Element
}

func ParseRawJSON(rawJSON []byte, imageURLsJSON []byte) (*Document, error) {
	var rawDoc docs.Document
	if err := json.Unmarshal(rawJSON, &rawDoc); err != nil {
		return nil, err
	}
	if len(rawDoc.Tabs) == 0 {
		// Legacy format: data was stored as our parsed Document struct, not raw Google API.
		var legacyDoc Document
		if err := json.Unmarshal(rawJSON, &legacyDoc); err != nil {
			return nil, err
		}
		return &legacyDoc, nil
	}
	if len(imageURLsJSON) > 0 {
		var imageURLs map[string]string
		if err := json.Unmarshal(imageURLsJSON, &imageURLs); err == nil {
			applyImageURLsToRawDoc(&rawDoc, imageURLs)
		}
	}
	doc, err := New(&rawDoc)
	if err != nil {
		return nil, err
	}
	return &doc, nil
}

func applyImageURLsToRawDoc(rawDoc *docs.Document, imageURLs map[string]string) {
	for _, tab := range rawDoc.Tabs {
		if tab.DocumentTab == nil {
			continue
		}
		for id, obj := range tab.DocumentTab.InlineObjects {
			url, ok := imageURLs[id]
			if !ok {
				continue
			}
			props := obj.InlineObjectProperties
			if props == nil || props.EmbeddedObject == nil || props.EmbeddedObject.ImageProperties == nil {
				continue
			}
			props.EmbeddedObject.ImageProperties.ContentUri = url
			obj.InlineObjectProperties = props
			tab.DocumentTab.InlineObjects[id] = obj
		}
	}
}

func (d *Document) Markdown(w *strings.Builder) {
	for _, elem := range d.Content {
		elem.Value.Markdown(w)
	}
}

func (d *Document) IndexableText(w *strings.Builder) {
	for _, elem := range d.Content {
		elem.Value.IndexableText(w)
		io.WriteString(w, "\n")
	}
}

func (d *Document) Images() []*DocImage {
	return generic.Flatten(d.Content, func(in Element) []*DocImage { return in.Value.Images() })
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

type listStack struct {
	stack []*List
}

func (ls *listStack) top() *List {
	if len(ls.stack) > 0 {
		return ls.stack[len(ls.stack)-1]
	}
	return nil
}

func (ls *listStack) push() *List {
	list := new(List)
	ls.stack = append(ls.stack, list)
	return list
}

func (ls *listStack) pop() *List {
	var out *List
	ls.stack, out = ls.stack[:len(ls.stack)-1], ls.stack[len(ls.stack)-1]
	return out
}

func parseStructuralElements(elements []*docs.StructuralElement, inlineObjects map[string]docs.InlineObject) []Element {
	var out []Element
	var ls listStack
	var currList *List
	for _, elem := range elements {
		para := elem.Paragraph
		if para == nil {
			continue
		}
		headingLevel := 0
		if para.ParagraphStyle != nil {
			switch para.ParagraphStyle.NamedStyleType {
			case "TITLE":
				headingLevel = 1
			case "SUBTITLE", "HEADING_1":
				headingLevel = 2
			case "HEADING_2":
				headingLevel = 3
			case "HEADING_3":
				headingLevel = 4
			case "HEADING_4":
				headingLevel = 5
			case "HEADING_5", "HEADING_6":
				headingLevel = 6
			}
		}
		paraElements := parseParagraphElements(para.Elements, inlineObjects)
		if headingLevel > 0 {
			for i := range paraElements {
				if t, ok := paraElements[i].Value.(*DocText); ok {
					t.FontSize = 0
				}
			}
		}
		el := Element{
			Type: "paragraph",
			Value: &Paragraph{
				Elements:     paraElements,
				HeadingLevel: headingLevel,
			},
		}
		if para.Bullet != nil {
			nest := int(para.Bullet.NestingLevel)
			if currList == nil {
				currList = ls.push()
			}
			if currList.Nesting == nest {
				currList.Items = append(currList.Items, el)
			} else if currList.Nesting < nest {
				currList = ls.push()
				currList.Nesting = nest
				currList.Items = append(currList.Items, el)
			} else {
				for currList.Nesting > nest {
					popped := ls.pop()
					currList = ls.top()
					currList.Items = append(currList.Items, Element{
						Type:  "list",
						Value: popped,
					})
				}
				currList.Nesting = nest
				currList.Items = append(currList.Items, el)
			}
		} else {
			if currList != nil {
				out = append(out, Element{
					Type:  "list",
					Value: currList,
				})
			}
			currList = nil
			out = append(out, el)
		}
	}
	return out
}

func parseParagraphElements(elements []*docs.ParagraphElement, inlineObjects map[string]docs.InlineObject) []Element {
	var out []Element
	for _, elem := range elements {
		if elem.TextRun != nil {
			el := parseTextRun(elem.TextRun)
			text := el.Value.(*DocText)
			if text.Trim() != "" || text.Flags&FlagLink != 0 {
				out = append(out, el)
			}
			continue
		}
		if elem.InlineObjectElement != nil {
			if elem := parseInlineObjectElement(elem.InlineObjectElement, inlineObjects); elem != nil {
				out = append(out, *elem)
			}
			continue
		}
		slog.Warn("skipped non-text, non-inlineobjectelement", "elem", elem)
	}
	return out
}
