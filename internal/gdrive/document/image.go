package document

import (
	"fmt"
	"io"

	"google.golang.org/api/docs/v1"
)

type DocImage struct {
	Title       string
	Description string
	Width       float64
	Height      float64
	Margin      [4]float64 // top right down left, like in css
	Crop        [4]float64 // top right down left, like in css
	URL         string
	Volatile    bool
	Angle       float64
}

func (di *DocImage) Scale() float64 {
	return max(
		1/(1-di.Crop[3]-di.Crop[1]),
		1/(1-di.Crop[0]-di.Crop[2]),
	)
}

func (di *DocImage) Markdown(w io.Writer) {
	if di == nil {
		return
	}
	fmt.Fprintf(w, "![%s %s](%s)\n", di.Title, di.Description, di.URL)
}

func (*DocImage) IndexableText(io.Writer) {
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
		if embedded.Size.Width != nil {
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

	out.URL = imageProperties.ContentUri
	out.Volatile = true
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
