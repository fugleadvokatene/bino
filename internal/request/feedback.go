package request

import "github.com/fugleadvokatene/bino/internal/model"

type Feedback struct {
	Items    []FeedbackItem
	NSkipped int
}

func (fb Feedback) CSSClass() string {
	var maxFBT model.FB
	for _, item := range fb.Items {
		if item.Type > maxFBT {
			maxFBT = item.Type
		}
	}
	return maxFBT.CSSClass()
}

// Buttons returns all unique buttons across items, defaulting to a single OK closer.
func (fb Feedback) Buttons() []FeedbackButton {
	seen := map[string]bool{}
	var result []FeedbackButton
	for _, item := range fb.Items {
		for _, btn := range item.Buttons {
			key := btn.Label + "|" + btn.URL
			if !seen[key] {
				seen[key] = true
				result = append(result, btn)
			}
		}
	}
	if len(result) == 0 {
		return []FeedbackButton{{Label: "OK", Class: "btn-success closer"}}
	}
	return result
}

type FeedbackItem struct {
	Message string
	Type    model.FB
	Buttons []FeedbackButton
}

type FeedbackButton struct {
	Label string
	// URL is the href for link buttons. Empty means the button acts as a closer.
	URL   string
	Class string
}
