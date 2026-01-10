package model

import "fmt"

type Division struct {
	ID   int32
	Name string

	// Optional
	Homes []Home
}

func (d *Division) SetNameURL() string {
	return fmt.Sprintf("/homes/divisions/%d/set-name", d.ID)
}
