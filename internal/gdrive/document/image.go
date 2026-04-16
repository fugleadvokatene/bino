package document

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"google.golang.org/api/docs/v1"
)

var fileIDRegex = regexp.MustCompile("/file/(\\d+)/")

type DocImage struct {
	Title          string
	Description    string
	Width          float64
	Height         float64
	Margin         [4]float64 // top right down left, like in css
	Crop           [4]float64 // top right down left, like in css
	URL            string
	Angle          float64
	InlineObjectID string
}

func (img *DocImage) ContainerStyle() string {
	return fmt.Sprintf("width: %dpx; height: %dpx; overflow: hidden; position: relative", int(img.Width), int(img.Height))
}

func (img *DocImage) ImgStyle() string {
	top := img.Crop[0]
	right := img.Crop[1]
	bottom := img.Crop[2]
	left := img.Crop[3]
	xFraction := 1 - left - right
	yFraction := 1 - top - bottom
	if xFraction <= 0 {
		xFraction = 1
	}
	if yFraction <= 0 {
		yFraction = 1
	}
	scaleX := 100 / xFraction
	scaleY := 100 / yFraction
	leftPct := -left * scaleX
	topPct := -top * scaleY
	return fmt.Sprintf("position: absolute; width: %.4g%%; height: %.4g%%; left: %.4g%%; top: %.4g%%; max-width: none",
		scaleX, scaleY, leftPct, topPct)
}

func (di *DocImage) Markdown(w *strings.Builder) {
	if di == nil {
		return
	}
	fmt.Fprintf(w, "![%s %s](%s)\n", di.Title, di.Description, di.URL)
}

func (di *DocImage) FileID() (int32, bool) {
	matches := fileIDRegex.FindStringSubmatch(di.URL)
	if len(matches) <= 1 {
		return 0, false
	}
	i, err := strconv.ParseInt(matches[1], 10, 32)
	return int32(i), err == nil
}

func (*DocImage) IndexableText(*strings.Builder) {
}

func (di *DocImage) Images() []*DocImage {
	return []*DocImage{di}
}

func parseInlineObjectElement(elem *docs.InlineObjectElement, inlineObjects map[string]docs.InlineObject) *Element {
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
	out.Crop[0] = imageProperties.CropProperties.OffsetTop
	out.Crop[1] = imageProperties.CropProperties.OffsetRight
	out.Crop[2] = imageProperties.CropProperties.OffsetBottom
	out.Crop[3] = imageProperties.CropProperties.OffsetLeft

	return &Element{
		Type:  "image",
		Value: &out,
	}
}
