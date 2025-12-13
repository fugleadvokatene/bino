package handlerspeciesadmin

import (
	"github.com/fugleadvokatene/bino/internal/handlers/handlercrud"
)

type SpeciesLangs struct {
	ID        int32
	LatinName string
	handlercrud.Names
}
