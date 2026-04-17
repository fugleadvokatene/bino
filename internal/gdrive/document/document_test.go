package document

import (
	"testing"

	"google.golang.org/api/docs/v1"
)

func makeTextRun(content string) *docs.ParagraphElement {
	return &docs.ParagraphElement{
		TextRun: &docs.TextRun{
			Content:   content,
			TextStyle: &docs.TextStyle{},
		},
	}
}

func makeStructuralElement(content string, style string) *docs.StructuralElement {
	return &docs.StructuralElement{
		Paragraph: &docs.Paragraph{
			ParagraphStyle: &docs.ParagraphStyle{NamedStyleType: style},
			Elements:       []*docs.ParagraphElement{makeTextRun(content)},
		},
	}
}

func makeBulletElement(content string, nesting int64) *docs.StructuralElement {
	return &docs.StructuralElement{
		Paragraph: &docs.Paragraph{
			ParagraphStyle: &docs.ParagraphStyle{NamedStyleType: "NORMAL_TEXT"},
			Bullet:         &docs.Bullet{NestingLevel: nesting},
			Elements:       []*docs.ParagraphElement{makeTextRun(content)},
		},
	}
}

func makeTestDoc() *docs.Document {
	return &docs.Document{
		DocumentId: "test-id",
		Title:      "Test",
		Tabs: []*docs.Tab{
			{
				DocumentTab: &docs.DocumentTab{
					Body: &docs.Body{
						Content: []*docs.StructuralElement{
							makeStructuralElement("Hello world\n", "NORMAL_TEXT"),
							makeStructuralElement("A heading\n", "HEADING_1"),
							makeBulletElement("List item\n", 0),
						},
					},
				},
			},
		},
	}
}

func TestFromRawDoc(t *testing.T) {
	raw := makeTestDoc()
	doc := FromRawDoc(raw, nil)
	if len(doc.Paragraphs) != 3 {
		t.Fatalf("expected 3 paragraphs, got %d", len(doc.Paragraphs))
	}
	p0 := doc.Paragraphs[0]
	if p0.ParaID != 0 || p0.Heading != 0 || p0.List {
		t.Errorf("paragraph 0 unexpected: %+v", p0)
	}
	p1 := doc.Paragraphs[1]
	if p1.ParaID != 1 || p1.Heading != 2 {
		t.Errorf("paragraph 1 unexpected: %+v", p1)
	}
	p2 := doc.Paragraphs[2]
	if p2.ParaID != 2 || !p2.List {
		t.Errorf("paragraph 2 unexpected: %+v", p2)
	}
}

func TestExtractIndexableText(t *testing.T) {
	raw := makeTestDoc()
	text := ExtractIndexableText(raw)
	if text == "" {
		t.Fatal("expected non-empty indexable text")
	}
	if !contains(text, "Hello world") {
		t.Errorf("expected 'Hello world' in text, got: %s", text)
	}
	if !contains(text, "A heading") {
		t.Errorf("expected 'A heading' in text, got: %s", text)
	}
}

func contains(s, sub string) bool {
	return len(s) >= len(sub) && (s == sub || len(s) > 0 && containsStr(s, sub))
}

func containsStr(s, sub string) bool {
	for i := 0; i <= len(s)-len(sub); i++ {
		if s[i:i+len(sub)] == sub {
			return true
		}
	}
	return false
}
