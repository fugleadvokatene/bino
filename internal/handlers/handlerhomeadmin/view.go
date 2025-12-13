package handlerhomeadmin

import (
	"fmt"

	"github.com/fugleadvokatene/bino/internal/model"
)

type HomeViewAdmin struct {
	ID    int32
	Name  string
	Users []model.User
}

func (hva *HomeViewAdmin) SetNameURL() string {
	return fmt.Sprintf("/homes/%d/set-name", hva.ID)
}
