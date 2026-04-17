package document

import (
	"strings"

	"google.golang.org/api/docs/v1"
)

// GDocsDocument is the simplified format exchanged between the frontend and
// backend, and stored in edited_json. It maps directly to Google Docs
// concepts without the intermediate Bino layer.
//
// ParaID values are assigned sequentially (0, 1, 2, …) from the live
// document's flat paragraph list. The frontend preserves these IDs through
// TipTap; new paragraphs added by the user carry ParaID == -1.
type GDocsDocument struct {
	Paragraphs []GDocsParagraph `json:"paragraphs"`
}

// GDocsParagraph is one paragraph (or list item) in a GDocsDocument.
type GDocsParagraph struct {
	ParaID  int        `json:"paraId"`  // 0-based position in live doc; -1 = new
	Heading int        `json:"heading"` // 0=normal, 1=title, 2..6=headings
	List    bool       `json:"list"`
	Ordered bool       `json:"ordered"`
	Nesting int        `json:"nesting"`
	Runs    []GDocsRun `json:"runs"`
}

// GDocsRun is either a text run or an image run within a paragraph.
// When ImageID is non-empty it is an image run; otherwise it is a text run.
type GDocsRun struct {
	// Text run fields
	Text          string `json:"text,omitempty"`
	Bold          bool   `json:"bold,omitempty"`
	Italic        bool   `json:"italic,omitempty"`
	Underline     bool   `json:"underline,omitempty"`
	Strikethrough bool   `json:"strikethrough,omitempty"`
	Link          string `json:"link,omitempty"`
	// Image run fields
	ImageID string     `json:"imageId,omitempty"` // Google Docs InlineObjectID
	URL     string     `json:"url,omitempty"`
	Width   float64    `json:"width,omitempty"`
	Height  float64    `json:"height,omitempty"`
	Crop    [4]float64 `json:"crop,omitempty"` // top right bottom left (fractions)
}

// FromRawDoc converts a live Google Docs document into a GDocsDocument,
// applying imageURLs overrides so that image URLs point to Bino's file storage
// rather than Google's CDN. Each paragraph receives a sequential ParaID.
func FromRawDoc(raw *docs.Document, imageURLs map[string]string) *GDocsDocument {
	var body *docs.Body
	var inlineObjects map[string]docs.InlineObject
	if len(raw.Tabs) > 0 && raw.Tabs[0].DocumentTab != nil {
		body = raw.Tabs[0].DocumentTab.Body
		inlineObjects = raw.Tabs[0].DocumentTab.InlineObjects
	} else if raw.Body != nil {
		body = raw.Body
	}
	if body == nil {
		return &GDocsDocument{}
	}

	var paras []GDocsParagraph
	paraID := 0
	for _, se := range body.Content {
		p := se.Paragraph
		if p == nil {
			continue
		}

		var heading int
		if p.ParagraphStyle != nil {
			switch p.ParagraphStyle.NamedStyleType {
			case "TITLE":
				heading = 1
			case "SUBTITLE", "HEADING_1":
				heading = 2
			case "HEADING_2":
				heading = 3
			case "HEADING_3":
				heading = 4
			case "HEADING_4":
				heading = 5
			case "HEADING_5", "HEADING_6":
				heading = 6
			}
		}

		isList := p.Bullet != nil
		var nesting int
		if isList {
			nesting = int(p.Bullet.NestingLevel)
		}

		runs := parseParagraphRuns(p.Elements, inlineObjects, imageURLs)

		paras = append(paras, GDocsParagraph{
			ParaID:  paraID,
			Heading: heading,
			List:    isList,
			Ordered: false, // determined by TipTap; preserved through saves
			Nesting: nesting,
			Runs:    runs,
		})
		paraID++
	}

	return &GDocsDocument{Paragraphs: paras}
}

func parseParagraphRuns(
	elements []*docs.ParagraphElement,
	inlineObjects map[string]docs.InlineObject,
	imageURLs map[string]string,
) []GDocsRun {
	runs := make([]GDocsRun, 0)
	for _, elem := range elements {
		if elem.TextRun != nil {
			content := elem.TextRun.Content
			// Strip trailing newline (paragraph separator).
			content = strings.TrimRight(content, "\n")
			if content == "" {
				continue
			}
			style := elem.TextRun.TextStyle
			run := GDocsRun{Text: content}
			if style != nil {
				run.Bold = style.Bold
				run.Italic = style.Italic
				run.Underline = style.Underline
				run.Strikethrough = style.Strikethrough
				if style.Link != nil {
					run.Link = style.Link.Url
				}
			}
			runs = append(runs, run)
			continue
		}
		if elem.InlineObjectElement != nil {
			id := elem.InlineObjectElement.InlineObjectId
			obj, ok := inlineObjects[id]
			if !ok {
				continue
			}
			props := obj.InlineObjectProperties
			if props == nil || props.EmbeddedObject == nil || props.EmbeddedObject.ImageProperties == nil {
				continue
			}
			embedded := props.EmbeddedObject
			imgProps := embedded.ImageProperties
			run := GDocsRun{ImageID: id}
			if url, ok := imageURLs[id]; ok {
				run.URL = url
			} else {
				run.URL = imgProps.ContentUri
			}
			if embedded.Size != nil {
				if embedded.Size.Width != nil {
					run.Width = embedded.Size.Width.Magnitude
				}
				if embedded.Size.Height != nil {
					run.Height = embedded.Size.Height.Magnitude
				}
			}
			if cp := imgProps.CropProperties; cp != nil {
				run.Crop = [4]float64{cp.OffsetTop, cp.OffsetRight, cp.OffsetBottom, cp.OffsetLeft}
			}
			runs = append(runs, run)
		}
	}
	return runs
}
