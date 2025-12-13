package gdrive

import "slices"

type Permission struct {
	DisplayName string
	Email       string
	Role        string
}

func (gdp Permission) CanWrite() bool {
	return slices.Contains([]string{"owner", "organizer", "fileOrganizer", "writer"}, gdp.Role)
}
