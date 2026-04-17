package document

import (
	"encoding/json"
	"fmt"
	"strings"

	"google.golang.org/api/docs/v1"
)

// ParseRawGDocs decodes a raw Google Docs API JSON blob and converts it to a
// GDocsDocument, applying imageURLs overrides for uploaded images.
// Returns an error only on malformed JSON; an unrecognised format returns an
// empty document.
func ParseRawGDocs(rawJSON []byte, imageURLs map[string]string) (*GDocsDocument, error) {
	// Quick check: does it look like a Google Docs document (has "tabs" field)?
	var probe struct {
		Tabs []json.RawMessage `json:"tabs"`
	}
	if err := json.Unmarshal(rawJSON, &probe); err != nil {
		return nil, fmt.Errorf("parsing raw JSON: %w", err)
	}
	if len(probe.Tabs) == 0 {
		// Legacy Bino-format data; no longer supported.
		return &GDocsDocument{}, nil
	}

	var raw docs.Document
	if err := json.Unmarshal(rawJSON, &raw); err != nil {
		return nil, fmt.Errorf("parsing Google Docs document: %w", err)
	}
	return FromRawDoc(&raw, imageURLs), nil
}

// ExtractImages returns all inline images referenced in the document.
// The URL field will contain Google's CDN URL; callers should replace these
// with Bino's file storage URLs after uploading.
func ExtractImages(raw *docs.Document) []*DocImage {
	var inlineObjects map[string]docs.InlineObject
	var body *docs.Body
	if len(raw.Tabs) > 0 && raw.Tabs[0].DocumentTab != nil {
		body = raw.Tabs[0].DocumentTab.Body
		inlineObjects = raw.Tabs[0].DocumentTab.InlineObjects
	} else if raw.Body != nil {
		body = raw.Body
	}
	if body == nil {
		return nil
	}

	var images []*DocImage
	for _, se := range body.Content {
		if se.Paragraph == nil {
			continue
		}
		for _, pe := range se.Paragraph.Elements {
			if pe.InlineObjectElement == nil {
				continue
			}
			img := parseInlineObjectElement(pe.InlineObjectElement, inlineObjects)
			if img != nil {
				images = append(images, img)
			}
		}
	}
	return images
}

// ExtractIndexableText returns the plain-text content of the document suitable
// for full-text search indexing.
func ExtractIndexableText(raw *docs.Document) string {
	var body *docs.Body
	if len(raw.Tabs) > 0 && raw.Tabs[0].DocumentTab != nil {
		body = raw.Tabs[0].DocumentTab.Body
	} else if raw.Body != nil {
		body = raw.Body
	}
	if body == nil {
		return ""
	}

	var sb strings.Builder
	for _, se := range body.Content {
		if se.Paragraph == nil {
			continue
		}
		for _, pe := range se.Paragraph.Elements {
			if pe.TextRun == nil {
				continue
			}
			text := strings.TrimRight(pe.TextRun.Content, "\n")
			text = strings.TrimSpace(text)
			if text != "" {
				sb.WriteString(text)
				sb.WriteString(" ")
			}
		}
		sb.WriteString("\n")
	}
	return strings.TrimSpace(sb.String())
}
