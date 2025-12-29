package background

import (
	"context"
	"fmt"
	"time"

	dblib "github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

func CollectPatientStats(ctx context.Context, db *dblib.Database) (int64, error) {
	var patientID []int32
	var homeID []int32
	var speciesID []int32

	if patients, err := db.Q.GetActivePatientsForStatCollection(ctx); err != nil {
		return 0, fmt.Errorf("getting currently active patients: %w", err)
	} else {
		for _, row := range patients {
			patientID = append(patientID, row.ID)
			speciesID = append(speciesID, row.SpeciesID)
			homeID = append(homeID, row.CurrHomeID.Int32)
		}
	}

	total := len(patientID)
	d := pgtype.Date{Time: time.Now(), Valid: true}
	if prevCount, err := db.Q.StatPatientGetCurrentTotalCount(ctx, d); err == nil && prevCount > int64(total) {
		// We only track the peak daily amount
		return 0, nil
	}

	var created int64
	err := db.Transaction(ctx, func(ctx context.Context, q *dblib.Database) error {
		if err := q.Q.DeleteStatPatientForDate(ctx, d); err != nil {
			return fmt.Errorf("couldn't delete existing patient IDs: %w", err)
		}
		if n, err := q.Q.StatPatientInsert(ctx, sql.StatPatientInsertParams{
			Date:      d,
			SpeciesID: speciesID,
			PatientID: patientID,
			HomeID:    homeID,
		}); err != nil {
			return fmt.Errorf("inserting patient stats: %w", err)
		} else {
			created = n
		}
		return nil
	})

	return created, err
}
