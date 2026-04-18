package document

import (
	"log/slog"
	"strings"

	"google.golang.org/api/docs/v1"
)

// DocumentPatchRequests generates BatchUpdate requests to make the live Google
// Doc match edited.
//
// Paragraphs are matched by ParaID (the sequential index in the live doc at
// the time the document was fetched). Unmatched live paragraphs are deleted,
// new edited paragraphs (ParaID == -1) are inserted at the position they
// occupy in the edited list.
//
// All requests are ordered end-to-start so that an earlier operation's index
// is never shifted by a later one. Within a paragraph, text and style edits
// are also end-to-start.
func DocumentPatchRequests(live *docs.Document, edited *GDocsDocument) []*docs.Request {
	liveParas := extractLiveParas(live)
	editedParas := edited.Paragraphs

	slog.Info("DocumentPatchRequests",
		"liveParas", len(liveParas),
		"editedParas", len(editedParas),
	)

	// --- Build match map: liveIndex → editedPara (first-wins on duplicate paraIds) ---
	matchedByLive := make(map[int]*GDocsParagraph, len(editedParas))
	for i := range editedParas {
		ep := &editedParas[i]
		if ep.ParaID >= 0 && ep.ParaID < len(liveParas) {
			if _, exists := matchedByLive[ep.ParaID]; !exists {
				matchedByLive[ep.ParaID] = ep
			}
		}
	}

	// --- Build insertion map: liveIdx → paragraphs to insert after it ---
	// Use -1 to mean "before everything". Duplicate paraIds (counted only
	// on first occurrence) and truly new paragraphs (paraId==-1) are all
	// accumulated into the slot of the most recent matched predecessor.
	insertAfter := make(map[int][]GDocsParagraph)
	{
		seenPara := make(map[int]bool, len(editedParas))
		var pending []GDocsParagraph
		lastMatchedLiveIdx := -1
		flushPending := func(nextLiveIdx int) {
			if len(pending) == 0 {
				return
			}
			insertAfter[lastMatchedLiveIdx] = append(insertAfter[lastMatchedLiveIdx], pending...)
			pending = pending[:0]
		}
		for _, ep := range editedParas {
			if ep.ParaID >= 0 && ep.ParaID < len(liveParas) && !seenPara[ep.ParaID] {
				seenPara[ep.ParaID] = true
				flushPending(ep.ParaID)
				lastMatchedLiveIdx = ep.ParaID
			} else {
				// Duplicate paraId or paraId==-1: treat as new content.
				pending = append(pending, ep)
			}
		}
		flushPending(-1)
	}

	var reqs []*docs.Request

	terminalEnd := int64(0)
	if len(liveParas) > 0 {
		terminalEnd = liveParas[len(liveParas)-1].endIndex
	}

	// --- Single end-to-start pass: patch matched, delete unmatched ---
	// Insertions are emitted immediately after their predecessor paragraph so
	// that they use indices valid in the current (already-patched) document
	// state. This avoids stale-index errors when deletions above the insertion
	// point have shrunk the document.
	for i := len(liveParas) - 1; i >= 0; i-- {
		lp := &liveParas[i]
		if ep, ok := matchedByLive[i]; ok {
			slog.Info("  patch pair", "liveIdx", i, "paraId", ep.ParaID)
			patchReqs := patchParagraphGDocs(lp, ep)
			reqs = append(reqs, patchReqs...)

			// Emit any insertions after this paragraph immediately.
			// The insertion point is lp.endIndex adjusted for the net content
			// change from the patch (so we land after the paragraph's \n).
			if grp, ok := insertAfter[i]; ok {
				delta := paragraphTextDelta(lp, ep)
				var insertAt int64
				if lp.endIndex == terminalEnd {
					insertAt = lp.endIndex - 1 + delta
				} else {
					insertAt = lp.endIndex + delta
				}
				slog.Info("  insert after", "liveIdx", i, "count", len(grp), "at", insertAt)
				rb := &docRequestBuilder{pos: insertAt}
				for j := range grp {
					rb.appendParagraphGDocs(&grp[j])
				}
				reqs = append(reqs, rb.requests...)
			}
		} else {
			if lp.hasImages() {
				slog.Info("  skip delete (has images)", "liveIdx", i)
				continue
			}
			end := lp.endIndex
			if end == terminalEnd {
				end--
			}
			if lp.startIndex < end {
				slog.Info("  delete unmatched live para", "liveIdx", i, "start", lp.startIndex, "end", end)
				reqs = append(reqs, deleteRange(lp.startIndex, end))
			}
		}
	}

	// Insertions with afterLiveIdx==-1 go at the very start of the document.
	if grp, ok := insertAfter[-1]; ok {
		var insertAt int64
		if len(liveParas) > 0 {
			insertAt = liveParas[0].startIndex
		} else {
			insertAt = 1
		}
		slog.Info("  insert at start", "count", len(grp), "at", insertAt)
		rb := &docRequestBuilder{pos: insertAt}
		for j := range grp {
			rb.appendParagraphGDocs(&grp[j])
		}
		reqs = append(reqs, rb.requests...)
	}

	return reqs
}

// patchParagraphGDocs produces requests to transform lp's text content into
// ep's. Images are left in place. Requests within the paragraph are ordered
// end-to-start.
func patchParagraphGDocs(lp *livePara, ep *GDocsParagraph) []*docs.Request {
	// Fast path: skip entirely if text content, heading, and list are all
	// unchanged. This avoids wiping Google Docs inline formatting on every save.
	if ep.Heading == lp.headingLevel && ep.List == lp.isList && liveTextMatchesEdited(lp, ep) {
		return nil
	}

	var reqs []*docs.Request

	// Split edited runs at image boundaries → one []GDocsRun per text slot.
	editedSegs := editedRunSegments(ep)

	// Collect live text-only segments (images stay put).
	var liveTextSegs []liveSegment
	for _, s := range lp.segments {
		if s.inlineObjectID == "" {
			liveTextSegs = append(liveTextSegs, s)
		}
	}

	// Replace each text slot, end-to-start.
	n := min(len(liveTextSegs), len(editedSegs))
	for i := n - 1; i >= 0; i-- {
		ls := liveTextSegs[i]
		es := editedSegs[i]

		if ls.startIndex < ls.endIndex {
			reqs = append(reqs, deleteRange(ls.startIndex, ls.endIndex))
		}

		pos := ls.startIndex
		for _, run := range es {
			if run.Text == "" {
				continue
			}
			reqs = append(reqs, &docs.Request{
				InsertText: &docs.InsertTextRequest{
					Text:     run.Text,
					Location: &docs.Location{Index: pos},
				},
			})
			end := pos + utf16Len(run.Text)
			// Always emit UpdateTextStyle, even for plain runs. Google Docs
			// inherits the formatting of the preceding character on insert, so
			// an explicit clear is needed when inserting plain text after bold.
			reqs = append(reqs, fullRunStyleReq(pos, end, &run))
			pos = end
		}
	}

	paraRange := &docs.Range{StartIndex: lp.startIndex, EndIndex: lp.startIndex + 1}

	// Heading / named style.
	if ep.Heading != lp.headingLevel {
		reqs = append(reqs, &docs.Request{
			UpdateParagraphStyle: &docs.UpdateParagraphStyleRequest{
				Range:          paraRange,
				ParagraphStyle: &docs.ParagraphStyle{NamedStyleType: headingStyleType(ep.Heading)},
				Fields:         "namedStyleType",
			},
		})
	}

	// List bullet.
	switch {
	case ep.List && !lp.isList:
		preset := "BULLET_DISC_CIRCLE_SQUARE"
		if ep.Ordered {
			preset = "NUMBERED_DECIMAL_ALPHA_ROMAN"
		}
		reqs = append(reqs, &docs.Request{
			CreateParagraphBullets: &docs.CreateParagraphBulletsRequest{
				Range:        paraRange,
				BulletPreset: preset,
			},
		})
	case !ep.List && lp.isList:
		reqs = append(reqs, &docs.Request{
			DeleteParagraphBullets: &docs.DeleteParagraphBulletsRequest{
				Range: paraRange,
			},
		})
	}

	return reqs
}

// fullRunStyleReq emits an UpdateTextStyle that explicitly sets or clears every
// supported field, so that styles not present in run are cleared rather than
// inherited.
func fullRunStyleReq(start, end int64, run *GDocsRun) *docs.Request {
	style := &docs.TextStyle{
		Bold:          run.Bold,
		Italic:        run.Italic,
		Underline:     run.Underline,
		Strikethrough: run.Strikethrough,
	}
	if run.Link != "" {
		style.Link = &docs.Link{Url: run.Link}
	}
	return &docs.Request{
		UpdateTextStyle: &docs.UpdateTextStyleRequest{
			Range:     &docs.Range{StartIndex: start, EndIndex: end},
			TextStyle: style,
			Fields:    "bold,italic,underline,strikethrough,link",
		},
	}
}

// editedRunSegments splits ep's runs at image boundaries.
// Each returned slice is the text runs for one inter-image text slot.
func editedRunSegments(ep *GDocsParagraph) [][]GDocsRun {
	var segs [][]GDocsRun
	var cur []GDocsRun
	for _, run := range ep.Runs {
		if run.ImageID != "" {
			segs = append(segs, cur)
			cur = nil
		} else {
			cur = append(cur, run)
		}
	}
	if len(cur) > 0 || len(segs) == 0 {
		segs = append(segs, cur)
	}
	return segs
}

// --- live-doc extraction (unchanged from before) ---

type livePara struct {
	startIndex   int64
	endIndex     int64
	segments     []liveSegment
	headingLevel int
	isList       bool
}

type liveSegment struct {
	startIndex     int64
	endIndex       int64
	inlineObjectID string // non-empty → image
	text           string // plain text content (empty for image segments)
}

func (lp *livePara) hasImages() bool {
	for _, s := range lp.segments {
		if s.inlineObjectID != "" {
			return true
		}
	}
	return false
}

func extractLiveParas(live *docs.Document) []livePara {
	var body *docs.Body
	if len(live.Tabs) > 0 && live.Tabs[0].DocumentTab != nil {
		body = live.Tabs[0].DocumentTab.Body
	} else {
		body = live.Body
	}
	if body == nil {
		return nil
	}

	var out []livePara
	for _, se := range body.Content {
		if se.Paragraph == nil {
			continue
		}
		lp := livePara{
			startIndex: se.StartIndex,
			endIndex:   se.EndIndex,
		}
		if ps := se.Paragraph.ParagraphStyle; ps != nil {
			lp.headingLevel = namedStyleToLevel(ps.NamedStyleType)
		}
		lp.isList = se.Paragraph.Bullet != nil

		// Collect text runs and image positions separately.
		type textRun struct {
			start, end int64
			text       string
		}
		var textRuns []textRun
		cur := se.StartIndex
		for _, pe := range se.Paragraph.Elements {
			if pe.InlineObjectElement != nil {
				if cur < pe.StartIndex {
					lp.segments = append(lp.segments, liveSegment{
						startIndex: cur,
						endIndex:   pe.StartIndex,
					})
				}
				lp.segments = append(lp.segments, liveSegment{
					startIndex:     pe.StartIndex,
					endIndex:       pe.EndIndex,
					inlineObjectID: pe.InlineObjectElement.InlineObjectId,
				})
				cur = pe.EndIndex
			} else if pe.TextRun != nil {
				content := strings.TrimRight(pe.TextRun.Content, "\n")
				textRuns = append(textRuns, textRun{
					start: pe.StartIndex,
					end:   pe.StartIndex + utf16Len(content),
					text:  content,
				})
			}
		}
		paraContentEnd := se.EndIndex - 1 // exclude trailing \n
		if cur < paraContentEnd {
			// Build the text for the final (non-image) segment from collected text runs.
			var sb strings.Builder
			for _, tr := range textRuns {
				sb.WriteString(tr.text)
			}
			lp.segments = append(lp.segments, liveSegment{
				startIndex: cur,
				endIndex:   paraContentEnd,
				text:       sb.String(),
			})
		}
		out = append(out, lp)
	}
	return out
}

func namedStyleToLevel(s string) int {
	switch s {
	case "TITLE":
		return 1
	case "HEADING_1":
		return 2
	case "HEADING_2":
		return 3
	case "HEADING_3":
		return 4
	case "HEADING_4":
		return 5
	case "HEADING_5", "HEADING_6":
		return 6
	default:
		return 0
	}
}

// --- shared request builder ---

type docRequestBuilder struct {
	requests []*docs.Request
	pos      int64
}

func (rb *docRequestBuilder) appendParagraphGDocs(ep *GDocsParagraph) {
	start := rb.pos
	for _, run := range ep.Runs {
		if run.ImageID != "" {
			continue // images in inserted paragraphs are not yet supported
		}
		if run.Text != "" {
			rb.insertRunText(&run)
		}
	}
	rb.insertRaw("\n")
	end := rb.pos

	if ep.Heading > 0 {
		rb.requests = append(rb.requests, &docs.Request{
			UpdateParagraphStyle: &docs.UpdateParagraphStyleRequest{
				Range:          &docs.Range{StartIndex: start, EndIndex: end},
				ParagraphStyle: &docs.ParagraphStyle{NamedStyleType: headingStyleType(ep.Heading)},
				Fields:         "namedStyleType",
			},
		})
	}
	if ep.List {
		preset := "BULLET_DISC_CIRCLE_SQUARE"
		if ep.Ordered {
			preset = "NUMBERED_DECIMAL_ALPHA_ROMAN"
		}
		rb.requests = append(rb.requests, &docs.Request{
			CreateParagraphBullets: &docs.CreateParagraphBulletsRequest{
				Range:        &docs.Range{StartIndex: start, EndIndex: end},
				BulletPreset: preset,
			},
		})
		if ep.Nesting > 0 {
			indent := float64(ep.Nesting) * 36
			rb.requests = append(rb.requests, &docs.Request{
				UpdateParagraphStyle: &docs.UpdateParagraphStyleRequest{
					Range: &docs.Range{StartIndex: start, EndIndex: end},
					ParagraphStyle: &docs.ParagraphStyle{
						IndentFirstLine: &docs.Dimension{Magnitude: 18 + indent, Unit: "PT"},
						IndentStart:     &docs.Dimension{Magnitude: 36 + indent, Unit: "PT"},
					},
					Fields: "indentFirstLine,indentStart",
				},
			})
		}
	}
}

func (rb *docRequestBuilder) insertRaw(text string) {
	rb.requests = append(rb.requests, &docs.Request{
		InsertText: &docs.InsertTextRequest{
			Text:     text,
			Location: &docs.Location{Index: rb.pos},
		},
	})
	rb.pos += utf16Len(text)
}

func (rb *docRequestBuilder) insertRunText(run *GDocsRun) {
	start := rb.pos
	rb.insertRaw(run.Text)
	end := rb.pos
	rb.requests = append(rb.requests, fullRunStyleReq(start, end, run))
}

// --- helpers ---

// liveTextMatchesEdited returns true when the plain-text content of the live
// paragraph (all text segments concatenated) equals the plain-text of the
// edited paragraph (all run texts concatenated). Image positions are ignored.
func liveTextMatchesEdited(lp *livePara, ep *GDocsParagraph) bool {
	var live strings.Builder
	for _, seg := range lp.segments {
		if seg.inlineObjectID == "" {
			live.WriteString(seg.text)
		}
	}
	var edited strings.Builder
	for _, run := range ep.Runs {
		if run.ImageID == "" {
			edited.WriteString(run.Text)
		}
	}
	return live.String() == edited.String()
}

// paragraphTextDelta returns the net change in character count that
// patchParagraphGDocs will apply to lp when transforming it to ep.
// This is used to adjust insertion points after the patch is emitted.
func paragraphTextDelta(lp *livePara, ep *GDocsParagraph) int64 {
	var oldLen, newLen int64
	for _, seg := range lp.segments {
		if seg.inlineObjectID == "" {
			oldLen += seg.endIndex - seg.startIndex
		}
	}
	for _, run := range ep.Runs {
		if run.ImageID == "" {
			newLen += utf16Len(run.Text)
		}
	}
	return newLen - oldLen
}

func deleteRange(start, end int64) *docs.Request {
	return &docs.Request{
		DeleteContentRange: &docs.DeleteContentRangeRequest{
			Range: &docs.Range{StartIndex: start, EndIndex: end},
		},
	}
}

func headingStyleType(level int) string {
	switch level {
	case 1:
		return "TITLE"
	case 2:
		return "HEADING_1"
	case 3:
		return "HEADING_2"
	case 4:
		return "HEADING_3"
	case 5:
		return "HEADING_4"
	case 6:
		return "HEADING_5"
	default:
		return "NORMAL_TEXT"
	}
}

func utf16Len(s string) int64 {
	var n int64
	for _, r := range s {
		if r > 0xFFFF {
			n += 2
		} else {
			n++
		}
	}
	return n
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
