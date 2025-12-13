package model

import "fmt"

type Period struct {
	ID     int32
	HomeID int32
	From   Date
	To     Date
	Note   string
}

func (pv Period) DeleteURL() string {
	return fmt.Sprintf("/period/%d/delete", pv.ID)
}
