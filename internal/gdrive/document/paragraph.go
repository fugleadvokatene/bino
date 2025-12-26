package document

import (
	"io"

	"github.com/fugleadvokatene/bino/internal/generic"
)

type Paragraph struct {
	Elements  []Element
	ListLevel int64
}

func (dp *Paragraph) Images() []*DocImage {
	return generic.Flatten(dp.Elements, func(in Element) []*DocImage { return in.Value.Images() })
}

func (dt *Paragraph) Markdown(w io.Writer) {
	if dt.ListLevel > 0 {
		for range dt.ListLevel - 1 {
			io.WriteString(w, "  ")
		}
		io.WriteString(w, "- ")
	}
	for _, elem := range dt.Elements {
		elem.Value.Markdown(w)
	}
}
