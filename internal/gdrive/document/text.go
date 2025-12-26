package document

import (
	"fmt"
	"io"
	"strings"

	"google.golang.org/api/docs/v1"
)

type DocText struct {
	Content  string
	Flags    uint32
	FontSize int // 0 means default
	LinkURL  string
}

func (dt *DocText) Trim() string {
	return strings.TrimSpace(dt.Content)
}

func (di *DocText) Images() []*DocImage {
	return nil
}

const (
	FlagBold          = (1 << 0)
	FlagItalic        = (1 << 1)
	FlagUnderline     = (1 << 2)
	FlagStrikethrough = (1 << 3)
	FlagLink          = (1 << 4)
)

func (dt *DocText) Markdown(w io.Writer) {
	contentTrimmedRight := strings.TrimRight(dt.Content, "\r\n \t")
	endSpace := ""
	if len(contentTrimmedRight) < len(dt.Content) {
		endSpace = dt.Content[len(contentTrimmedRight):]
	}
	defer io.WriteString(w, endSpace)

	if dt.FontSize >= 34 {
		io.WriteString(w, "# ")
	} else if dt.FontSize >= 18 {
		io.WriteString(w, "## ")
	} else if dt.FontSize > 0 {
		io.WriteString(w, "### ")
	}
	if dt.Flags&FlagBold != 0 {
		io.WriteString(w, "**")
		defer io.WriteString(w, "**")
	}
	if dt.Flags&FlagUnderline != 0 {
		io.WriteString(w, "*")
		defer io.WriteString(w, "*")
	}
	if dt.Flags&FlagLink != 0 {
		fmt.Fprintf(w, "[%s](%s)", contentTrimmedRight, dt.LinkURL)
		return
	}
	io.WriteString(w, contentTrimmedRight)
}

func (dt *DocText) IndexableText(w io.Writer) {
	io.WriteString(w, dt.Trim())
}

func parseTextRun(textRun *docs.TextRun) Element {
	style := textRun.TextStyle
	var out DocText
	out.Content = textRun.Content
	if style.Bold {
		out.Flags |= FlagBold
	}
	if style.Italic {
		out.Flags |= FlagItalic
	}
	if style.Underline {
		out.Flags |= FlagUnderline
	}
	if style.Strikethrough {
		out.Flags |= FlagStrikethrough
	}
	if style.FontSize != nil {
		out.FontSize = int(style.FontSize.Magnitude)
	}
	if style.Link != nil && style.Link.Url != "" {
		out.LinkURL = style.Link.Url
		out.Flags |= FlagLink
	}
	return Element{
		Type:  "text",
		Value: &out,
	}
}

func (dt *DocText) ClassesFromFlags() []string {
	var out []string
	if dt.Flags&FlagBold != 0 {
		out = append(out, "journal-bold")
	}
	if dt.Flags&FlagItalic != 0 {
		out = append(out, "journal-italic")
	}
	if dt.Flags&FlagStrikethrough != 0 {
		out = append(out, "journal-strikethrough")
	}
	if dt.Flags&FlagUnderline != 0 {
		out = append(out, "journal-underline")
	}
	if dt.Flags == 0 {
		out = append(out, "journal-plain")
	}
	return out
}
