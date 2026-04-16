package document

import (
	"io"
	"strings"

	"github.com/fugleadvokatene/bino/internal/generic"
)

type Paragraph struct {
	Elements     []Element
	HeadingLevel int // 0 = body text, 1-6 = h1-h6
}

func (dp *Paragraph) Images() []*DocImage {
	return generic.Flatten(dp.Elements, func(in Element) []*DocImage { return in.Value.Images() })
}

func (dt *Paragraph) Markdown(w *strings.Builder) {
	if dt.HeadingLevel > 0 {
		io.WriteString(w, strings.Repeat("#", dt.HeadingLevel)+" ")
	}
	for _, elem := range dt.Elements {
		elem.Value.Markdown(w)
	}
}

func (dt *Paragraph) IndexableText(w *strings.Builder) {
	for _, elem := range dt.Elements {
		elem.Value.IndexableText(w)
		io.WriteString(w, " ")
	}
}
