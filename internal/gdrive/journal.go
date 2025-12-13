package gdrive

import (
	"errors"
	"fmt"
	"strings"

	"github.com/fugleadvokatene/bino/internal/model"
)

type Journal struct {
	Item    Item
	Content string
}

func (gdj *Journal) Validate() error {
	errs := []error{}
	for _, k := range model.TemplateValues() {
		if !strings.Contains(gdj.Content, k.String()) {
			errs = append(errs, fmt.Errorf("template is missing variable '%s'", k))
		}
	}
	return errors.Join(errs...)
}
