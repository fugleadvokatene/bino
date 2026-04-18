package handlerschedule

import (
	"context"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type createStandard struct {
	DB *db.Database
}

func (h *createStandard) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if err := request.ValidateCSRF(r); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patientID, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := CreateStandardTasksForPatient(ctx, h.DB, patientID); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func CreateStandardTasksForPatient(ctx context.Context, db *db.Database, patientID int32) error {
	templates, err := db.Q.GetStandardScheduleTemplates(ctx)
	if err != nil {
		return err
	}

	for _, t := range templates {
		var nextDueAt pgtype.Timestamptz
		if t.MorningEvening {
			nextDueAt = pgtype.Timestamptz{Time: NextMorningEvening(time.Now()), Valid: true}
		} else {
			nextDueAt = pgtype.Timestamptz{Time: time.Now(), Valid: true}
		}

		scheduleID, err := db.Q.AddSchedule(ctx, sql.AddScheduleParams{
			Description:    t.Description,
			IntervalHours:  t.IntervalHours,
			NextDueAt:      nextDueAt,
			MorningEvening: t.MorningEvening,
			RemainingCount: t.RemainingCount,
			EndDate:        pgtype.Timestamptz{},
		})
		if err != nil {
			return err
		}

		if err := db.Q.LinkScheduleToPatient(ctx, sql.LinkScheduleToPatientParams{
			ScheduleID: scheduleID,
			PatientID:  patientID,
		}); err != nil {
			return err
		}
	}

	return nil
}
