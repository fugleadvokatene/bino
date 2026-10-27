package handlerspeciesadmin

import (
	"github.com/fugleadvokatene/bino/internal/handlers/handlercrud"
)

type SpeciesLangs struct {
	ID        int32
	LatinName string
	// 0 if none
	GroupID int32
	handlercrud.Names
}

type GroupOption struct {
	ID   int32
	Name string
}
