package document

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/a-h/templ"
)

type Element struct {
	Type  string
	Value ElementValue
}

type ElementValue interface {
	Markdown(w *strings.Builder)
	IndexableText(w *strings.Builder)
	Images() []*DocImage
	Templ() templ.Component
}

func GetMarkdown(e ElementValue) string {
	builder := strings.Builder{}
	e.Markdown(&builder)
	return builder.String()
}

func GetIndexableText(e ElementValue) string {
	builder := strings.Builder{}
	e.IndexableText(&builder)
	return builder.String()
}

func (e *Element) UnmarshalJSON(b []byte) error {
	var aux struct {
		Type  string          `json:"type"`
		Value json.RawMessage `json:"value"`
	}
	if err := json.Unmarshal(b, &aux); err != nil {
		return err
	}
	e.Type = aux.Type
	switch aux.Type {
	case "text":
		var v DocText
		if err := json.Unmarshal(aux.Value, &v); err != nil {
			return err
		}
		e.Value = &v
	case "image":
		var v DocImage
		if err := json.Unmarshal(aux.Value, &v); err != nil {
			return err
		}
		e.Value = &v
	case "paragraph":
		var v Paragraph
		if err := json.Unmarshal(aux.Value, &v); err != nil {
			return err
		}
		e.Value = &v
	case "list":
		var v List
		if err := json.Unmarshal(aux.Value, &v); err != nil {
			return err
		}
		e.Value = &v
	default:
		return fmt.Errorf("unknown element type: %s", aux.Type)
	}
	return nil
}
