package document

import (
	"io"
	"strings"

	"github.com/fugleadvokatene/bino/internal/generic"
)

type Paragraph struct {
	Elements []Element
}

func (dp *Paragraph) Images() []*DocImage {
	return generic.Flatten(dp.Elements, func(in Element) []*DocImage { return in.Value.Images() })
}

func (dt *Paragraph) Markdown(w *strings.Builder) {
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
