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
	Content    []Element
}

func (d *Document) Markdown(w io.Writer) {
	for _, elem := range d.Content {
		elem.Value.Markdown(w)
	}
}
func (d *Document) IndexableText(w io.Writer) {
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
		el := Element{
			Type: "paragraph",
			Value: &Paragraph{
				Elements: parseParagraphElements(para.Elements, inlineObjects),
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
