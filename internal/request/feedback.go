package request

import (
	"github.com/fugleadvokatene/bino/internal/enums"
)

type Feedback struct {
	Items    []FeedbackItem
	NSkipped int
}

func (fb Feedback) CSSClass() string {
	var maxFBT enums.FB
	for _, item := range fb.Items {
		if item.Type > maxFBT {
			maxFBT = item.Type
		}
	}
	return maxFBT.CSSClass()
}

type FeedbackItem struct {
	Message string
	Type    enums.FB
}
