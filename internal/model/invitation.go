package model

import (
	"fmt"
	"time"
)

type Invitation struct {
	ID          string
	Email       string
	Created     time.Time
	Expires     time.Time
	AccessLevel AccessLevel
	HomeID      int32
	HomeName    string
}

func (inv Invitation) DeleteURL() string {
	return fmt.Sprintf("/invite/%s/delete", inv.ID)
}
