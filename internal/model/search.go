package model

import (
	"strings"
)

type Match struct {
	URL           string
	Type          MatchType
	HeaderRuns    []HighlightRun
	BodyFragments []HighlightFragment
	Rank          float32
	RankParts     map[string]float32

	ExtraData string
}

type HighlightFragment struct {
	Runs []HighlightRun
}

func SplitFragments(runs []HighlightRun) []HighlightFragment {
	var frags []HighlightFragment
	var current []HighlightRun

	for _, r := range runs {
		if strings.Contains(r.Text, "[CUT]") {
			parts := strings.Split(r.Text, "[CUT]")
			for i, part := range parts {
				if part != "" {
					current = append(current, HighlightRun{Text: part, Hit: r.Hit})
				}
				// every [CUT] ends the current fragment
				if i < len(parts)-1 {
					if len(current) > 0 {
						frags = append(frags, HighlightFragment{Runs: current})
						current = nil
					}
				}
			}
		} else {
			current = append(current, r)
		}
	}

	if len(current) > 0 {
		frags = append(frags, HighlightFragment{Runs: current})
	}

	return frags
}

type HighlightRun struct {
	Text string
	Hit  bool
}

func ParseHeadline(s string) []HighlightRun {
	const start = "[START]"
	const stop = "[STOP]"
	var out []HighlightRun
	i := 0
	for i < len(s) {
		ix := strings.Index(s[i:], start)
		if ix < 0 {
			out = append(out, HighlightRun{Text: s[i:], Hit: false})
			break
		}
		ix += i
		if ix > i {
			out = append(out, HighlightRun{Text: s[i:ix], Hit: false})
		}
		j := strings.Index(s[ix+len(start):], stop)
		if j < 0 {
			out = append(out, HighlightRun{Text: s[ix:], Hit: false})
			break
		}
		j += ix + len(start)
		out = append(out, HighlightRun{Text: s[ix+len(start) : j], Hit: true})
		i = j + len(stop)
	}
	return out
}

func HighlightFallback(text, query string) []HighlightRun {
	const context = 40 // number of chars of context on each side
	lowerText := strings.ToLower(text)
	lowerQuery := strings.ToLower(query)
	var out []HighlightRun

	pos := 0
	for {
		i := strings.Index(lowerText[pos:], lowerQuery)
		if i < 0 {
			break
		}
		i += pos
		start := max(0, i-context)
		end := min(len(text), i+len(query)+context)

		// Add ellipsis if we skipped earlier text
		if len(out) == 0 && start > 0 {
			out = append(out, HighlightRun{Text: "[CUT]", Hit: false})
		}

		out = append(out,
			HighlightRun{Text: text[start:i], Hit: false},
			HighlightRun{Text: text[i : i+len(query)], Hit: true},
		)

		pos = end
		if pos < len(text) {
			out = append(out, HighlightRun{Text: text[i+len(query) : pos], Hit: false})
		}

		if pos < len(text) {
			out = append(out, HighlightRun{Text: "[CUT]", Hit: false})
		}

		// Limit to a few snippets
		if len(out) > 5 {
			break
		}
	}

	if len(out) == 0 {
		// no match, take leading snippet
		if len(text) > 2*context {
			return []HighlightRun{{Text: text[:2*context] + "[CUT]", Hit: false}}
		}
		return []HighlightRun{{Text: text, Hit: false}}
	}

	return out
}
