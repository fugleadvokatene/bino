package job

import (
	"context"
	"log/slog"
	"math"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

var phi float64 = (1.0 + math.Sqrt(5.0)) / 2.0
var gSpread = phi

func Run[T any](
	ctx context.Context,
	db *db.Database,
	what string,
	interval time.Duration,
	f func(ctx context.Context, lastSuccess time.Time) (T, error),
) Hint {
	hint := make(Hint, 1)

	// Desync setup
	spread := gSpread
	gSpread += phi
	spread = math.Mod(spread, 1.0)
	first := true

	var lastSuccess time.Time
	if result, err := db.Q.GetJobLastSuccess(ctx, what); err == nil && result.Valid {
		lastSuccess = result.Time
	}

	// Run
	go func() {
		for {
			slog.Info("Started background job", "what", what)

			// Run job, capture time taken
			t0 := time.Now()
			result, err := f(ctx, lastSuccess)
			if err == nil {
				if err := db.Q.MarkJobCompleted(ctx, sql.MarkJobCompletedParams{
					Name: what,
					// Things may have happened concurrently with the job, so t0 is the last time we know is covered
					LastSuccess: pgtype.Timestamptz{Time: t0, Valid: true},
				}); err != nil {
					slog.Warn("Couldn't mark job as completed", "what", what, "err", err)
				}
			}

			// Compute time to next invocation
			elapsed := time.Since(t0)
			next := max(0, interval-elapsed)

			// Desync jobs with similar duration
			if first {
				next = time.Duration(float64(next) * spread)
				first = false
			}

			// Log info
			slog.Info(
				"Completed background job",
				"what", what,
				"err", err,
				"result", result,
				"elapsed", elapsed.Round(time.Millisecond),
				"next", next.Round(time.Second),
			)

			// Wait for next round
			select {
			case <-ctx.Done():
				return
			case <-time.After(next):
			case _ = <-hint:
			}
		}
	}()

	return hint
}

type Hint chan struct{}

func (hint Hint) Send() {
	select {
	case hint <- struct{}{}:
	default:
	}
}
