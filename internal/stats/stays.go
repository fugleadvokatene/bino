package stats

import (
	"time"

	"github.com/fugleadvokatene/bino/internal/model"
)

// Event is a patient event that affects whether or where the patient is in care.
type Event struct {
	PatientID int32
	SpeciesID int32
	HomeID    int32
	EventID   model.EventID
	// Only used for EventIDStatusChanged
	Status model.Status
	Time   time.Time
}

// Interval is a period a patient spent in a home. To is zero while ongoing.
type Interval struct {
	HomeID int32
	From   time.Time
	To     time.Time
}

// Stay is a patient's time in care, from intake to outcome.
type Stay struct {
	PatientID    int32
	SpeciesID    int32
	IntakeHomeID int32
	Intake       time.Time
	Intervals    []Interval
	// StatusAdmitted while the patient is still in care
	Outcome       model.Status
	OutcomeHomeID int32
	OutcomeTime   time.Time
}

type kind int

const (
	kindIgnored kind = iota
	kindIntake
	kindMove
	kindReopen
	kindOutcome
)

func classify(ev model.EventID, status model.Status) (kind, model.Status) {
	switch ev {
	case model.EventIDRegistered:
		return kindIntake, 0
	case model.EventIDTransferredToOtherHome:
		return kindMove, 0
	case model.EventIDUndidCheckout:
		return kindReopen, 0
	case model.EventIDAdopted:
		return kindOutcome, model.StatusAdopted
	case model.EventIDReleased:
		return kindOutcome, model.StatusReleased
	case model.EventIDTransferredOutsideOrganization:
		return kindOutcome, model.StatusTransferredOutsideOrganization
	case model.EventIDDied:
		return kindOutcome, model.StatusDead
	case model.EventIDEuthanized:
		return kindOutcome, model.StatusEuthanized
	case model.EventIDDeleted:
		return kindOutcome, model.StatusDeleted
	case model.EventIDStatusChanged:
		// Only checkouts, which is what checkout.go writes these for
		if !model.IsCheckoutStatus[status] {
			return kindIgnored, 0
		}
		return kindOutcome, status
	default:
		return kindIgnored, 0
	}
}

// LifecycleEventIDs are the event types BuildStays cares about.
func LifecycleEventIDs() []int32 {
	var out []int32
	for _, ev := range model.EventIDValues() {
		// Any checkout status, so StatusChanged is included
		if k, _ := classify(ev, model.StatusReleased); k != kindIgnored {
			out = append(out, int32(ev))
		}
	}
	return out
}

// BuildStays turns events, sorted by patient and then time, into stays.
//
// An outcome only counts if nothing puts the patient back in care afterwards:
// an UndidCheckout or a move cancels it, and the stay continues through it.
// A repeated outcome (e.g. double checkout) is ignored, unless it's Deleted.
func BuildStays(events []Event) []Stay {
	var stays []Stay
	for start := 0; start < len(events); {
		end := start
		for end < len(events) && events[end].PatientID == events[start].PatientID {
			end++
		}
		if stay, ok := buildStay(events[start:end]); ok {
			stays = append(stays, stay)
		}
		start = end
	}
	return stays
}

func buildStay(events []Event) (Stay, bool) {
	var stay Stay
	started := false
	var pending *Event
	var pendingOutcome model.Status

	for i := range events {
		ev := &events[i]
		k, outcome := classify(ev.EventID, ev.Status)
		switch k {
		case kindIntake, kindMove:
			pending = nil
			if !started {
				started = true
				stay.PatientID = ev.PatientID
				stay.SpeciesID = ev.SpeciesID
				stay.IntakeHomeID = ev.HomeID
				stay.Intake = ev.Time
			} else if n := len(stay.Intervals); n > 0 {
				stay.Intervals[n-1].To = ev.Time
			}
			stay.Intervals = append(stay.Intervals, Interval{HomeID: ev.HomeID, From: ev.Time})
		case kindReopen:
			pending = nil
		case kindOutcome:
			if started && pending == nil {
				pending = ev
				pendingOutcome = outcome
			} else if pending != nil && outcome == model.StatusDeleted {
				// Deleted after a checkout means the patient shouldn't have
				// been registered, so it wins
				pendingOutcome = outcome
			}
		}
	}

	if !started {
		return Stay{}, false
	}

	stay.Outcome = model.StatusAdmitted
	if pending != nil {
		stay.Outcome = pendingOutcome
		stay.OutcomeHomeID = pending.HomeID
		stay.OutcomeTime = pending.Time
		stay.Intervals[len(stay.Intervals)-1].To = pending.Time
	}
	return stay, true
}
