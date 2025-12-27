package document

import (
	"io"
	"strings"

	"github.com/fugleadvokatene/bino/internal/generic"
)

type List struct {
	Items   []Element
	Nesting int
	Ordered bool
}

func (li *List) Images() []*DocImage {
	return generic.Flatten(li.Items, func(in Element) []*DocImage { return in.Value.Images() })
}

func (dt *List) Markdown(w *strings.Builder) {
	for _, elem := range dt.Items {
		for range dt.Nesting {
			io.WriteString(w, "  ")
		}
		if _, ok := elem.Value.(*List); !ok {
			io.WriteString(w, "- ")
		}
		elem.Value.Markdown(w)
	}
}

func (dt *List) IndexableText(w *strings.Builder) {
	for _, item := range dt.Items {
		item.Value.IndexableText(w)
		io.WriteString(w, "\n")
	}
}
