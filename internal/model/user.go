package model

import (
	"fmt"
)

type User struct {
	ID           int32
	Name         string
	Email        string
	AvatarURL    string
	HasAvatarURL bool
	AccessLevel  AccessLevel
	LanguageID   int32

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

func (u *User) HasAccess(al AccessLevel) bool {
	return u.AccessLevel >= al
}
