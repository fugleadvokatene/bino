package document

import (
	"regexp"
	"strconv"

	"google.golang.org/api/docs/v1"
)

var fileIDRegex = regexp.MustCompile("/file/(\\d+)/")

// DocImage holds the metadata for a Google Docs inline image, with the URL
// rewritten to Bino's file storage once the image has been uploaded.
type DocImage struct {
	Title          string
	Description    string
	Width          float64
	Height         float64
	Margin         [4]float64 // top right bottom left, pixels
	Crop           [4]float64 // top right bottom left, fractions
	URL            string
	Angle          float64
	InlineObjectID string
}

func (di *DocImage) FileID() (int32, bool) {
	matches := fileIDRegex.FindStringSubmatch(di.URL)
	if len(matches) <= 1 {
		return 0, false
	}
	i, err := strconv.ParseInt(matches[1], 10, 32)
	return int32(i), err == nil
}

// parseInlineObjectElement extracts a DocImage from a paragraph element.
// Returns nil if the element is not a supported image.
func parseInlineObjectElement(elem *docs.InlineObjectElement, inlineObjects map[string]docs.InlineObject) *DocImage {
	obj, ok := inlineObjects[elem.InlineObjectId]
	if !ok {
		return nil
	}
	properties := obj.InlineObjectProperties
	if properties == nil {
		return nil
	}
	embedded := properties.EmbeddedObject
	if embedded == nil {
		return nil
	}
	imageProperties := embedded.ImageProperties
	if imageProperties == nil {
		return nil
	}

	var out DocImage
	out.Title = embedded.Title
	out.Description = embedded.Description

	if embedded.Size != nil {
		if embedded.Size.Width != nil {
			out.Width = embedded.Size.Width.Magnitude
		}
		if embedded.Size.Height != nil {
			out.Height = embedded.Size.Height.Magnitude
		}
	}
	if embedded.MarginTop != nil {
		out.Margin[0] = embedded.MarginTop.Magnitude
	}
	if embedded.MarginRight != nil {
		out.Margin[1] = embedded.MarginRight.Magnitude
	}
	if embedded.MarginBottom != nil {
		out.Margin[2] = embedded.MarginBottom.Magnitude
	}
	if embedded.MarginLeft != nil {
		out.Margin[3] = embedded.MarginLeft.Magnitude
	}

	out.InlineObjectID = elem.InlineObjectId
	out.URL = imageProperties.ContentUri
	out.Angle = imageProperties.Angle
	if cp := imageProperties.CropProperties; cp != nil {
		out.Crop[0] = cp.OffsetTop
		out.Crop[1] = cp.OffsetRight
		out.Crop[2] = cp.OffsetBottom
		out.Crop[3] = cp.OffsetLeft
	}

	return &out
}
