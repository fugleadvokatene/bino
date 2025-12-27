package model

import (
	"fmt"
	"time"
)

func PatientURL(id int32) string {
	return fmt.Sprintf("/patient/%d", id)
}

type Patient struct {
	ID                    int32
	Status                int32
	Name                  string
	Species               Species
	GoogleID              string
	TimeCheckin           time.Time
	TimeCheckout          time.Time
	SuggestedGoogleID     string
	SuggestedJournalTitle string
	CurrentHomeID         int32
	HasCurrentHome        bool
	JournalPending        bool
}

func (pv Patient) CollapseID(prefix string) string {
	return fmt.Sprintf("%spatient-collapsible-%d", prefix, pv.ID)
}

func (pv Patient) CheckoutNoteID(prefix string) string {
	return fmt.Sprintf("%spatient-checkout-note-%d", prefix, pv.ID)
}

func (pv Patient) CheckoutStatusID(prefix string) string {
	return fmt.Sprintf("%spatient-checkout-status-%d", prefix, pv.ID)
}

func (pv Patient) AttachJournalID(prefix string) string {
	return fmt.Sprintf("%spatient-attach-journal-%d", prefix, pv.ID)
}

func (pv Patient) CardID(prefix string) string {
	return fmt.Sprintf("%spatient-card_%d", prefix, pv.ID)
}

func (pv Patient) URL() string {
	return PatientURL(pv.ID)
}

func (pv Patient) URLSuffix(suffix string) string {
	return fmt.Sprintf("/patient/%d/%s", pv.ID, suffix)
}
