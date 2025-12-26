package document

import (
	"encoding/json"
	"fmt"
	"io"
)

type Element struct {
	Type  string
	Value interface {
		Markdown(w io.Writer)
		Images() []*DocImage
	}
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
	default:
		return fmt.Errorf("unknown element type: %s", aux.Type)
	}
	return nil
}
