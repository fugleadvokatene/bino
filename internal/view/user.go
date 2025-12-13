package view

import (
	"fmt"

	"github.com/fugleadvokatene/bino/internal/enums"
)

type User struct {
	ID           int32
	Name         string
	Email        string
	AvatarURL    string
	HasAvatarURL bool
	AccessLevel  enums.AccessLevel

	// Optional
	Homes []Home
}

func (u *User) Valid() bool {
	return u.ID > 0
}

func (u *User) URL() string {
	return fmt.Sprintf("/user/%d", u.ID)
}

func (u *User) URLSuffix(suffix string) string {
	return fmt.Sprintf("/user/%d/%s", u.ID, suffix)
}

func (u *User) HasAccess(al enums.AccessLevel) bool {
	return u.AccessLevel >= al
}
