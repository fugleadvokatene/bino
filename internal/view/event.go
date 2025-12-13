package view

import (
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

type Event struct {
	ID           int32
	PatientID    int32
	HomeID       int32
	Note         string
	EventID      int32
	AssociatedID pgtype.Int4
	AppuserID    int32
	HomeName     string
	UserName     string
	AvatarUrl    pgtype.Text

	TimeAbs string
	TimeRel string
	Time    time.Time
	Home    Home
	User    User
}

func (ev *Event) SetNoteURL() string {
	return fmt.Sprintf("/event/%d/set-note", ev.ID)
}
