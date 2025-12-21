package live

import (
	"fmt"

	"github.com/fugleadvokatene/bino/internal/model"
)

type Event struct {
	Type model.LiveEventType
	Data []byte
}

func (e Event) String() string {
	return fmt.Sprintf("{Type:%s Data:%s}", e.Type, string(e.Data))
}
