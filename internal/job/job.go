package job

import (
	"context"
	"log/slog"
	"math"
	"time"
)

var phi float64 = (1.0 + math.Sqrt(5.0)) / 2.0
var gSpread = phi

func Run[T any](
	ctx context.Context,
	what string,
	interval time.Duration,
	f func(ctx context.Context) (T, error),
) Hint {
	hint := make(Hint, 1)

	// Desync setup
	spread := gSpread
	gSpread += phi
	spread = math.Mod(spread, 1.0)
	first := true

	// Run
	go func() {
		for {
			slog.Info("Started background job", "what", what)

			// Run job, capture time taken
			t0 := time.Now()
			result, err := f(ctx)
			elapsed := time.Since(t0)

			// Compute time to next invocation
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
