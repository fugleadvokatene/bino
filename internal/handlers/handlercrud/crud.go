package handlercrud

import "github.com/fugleadvokatene/bino/internal/model"

type CRUDPage struct {
	Header          string
	LangIndependent []string
}

type Names map[int32]string

func (n Names) Name(i model.LanguageID) (string, bool) {
	name, found := n[int32(i)]
	return name, found
}
