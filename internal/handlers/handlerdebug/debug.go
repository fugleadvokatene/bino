package handlerdebug

import (
	"fmt"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/debug"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type page struct {
	ConstantInfo debug.ConstantInfo
	DB           *db.Database
	Bespoke      string
}

type TSSeries struct {
	Name   string
	Values []TSSample
}

type TSSample struct {
	T time.Time `json:"x"`
	V float32   `json:"y"`
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	keys := generic.SliceToSlice(model.DebugStatKeyValues(), func(in model.DebugStatKey) int16 { return int16(in) })
	keyNames := generic.SliceToMap(model.DebugStatKeyValues(), func(in model.DebugStatKey) (int16, string) { return int16(in), in.String() })
	timeSeries := generic.MapToMap(keyNames, func(in int16) *TSSeries { return &TSSeries{Name: keyNames[in]} })

	rows, err := h.DB.Q.StatDebugGet(ctx, sql.StatDebugGetParams{
		Keys:  keys,
		Start: pgtype.Timestamptz{Time: time.Now().AddDate(0, 0, -1), Valid: true},
		Stop:  pgtype.Timestamptz{Time: time.Now(), Valid: true},
	})
	if err != nil {
		rows = nil
	}
	for _, row := range rows {
		ts := timeSeries[row.Key]
		ts.Values = append(ts.Values, TSSample{T: row.Time.Time, V: row.Value})
	}

	_ = DebugPage(
		data,
		debug.GetDebugInfo(ctx, h.ConstantInfo, diskFullEstimate(timeSeries)),
		timeSeries,
	).Render(ctx, w)
}

func diskFullEstimate(timeSeries map[int16]*TSSeries) string {
	used := timeSeries[int16(model.DebugStatKeyMachineDiskUsedGB)]
	size := timeSeries[int16(model.DebugStatKeyMachineDiskSizeGB)]
	if used == nil || len(used.Values) < 2 || size == nil || len(size.Values) == 0 {
		return "N/A (insufficient data)"
	}
	first := used.Values[0]
	last := used.Values[len(used.Values)-1]
	elapsed := last.T.Sub(first.T).Seconds()
	if elapsed <= 0 {
		return "N/A"
	}
	growthPerSec := float64(last.V-first.V) / elapsed
	if growthPerSec <= 0 {
		return "never (disk not growing)"
	}
	diskSizeGB := float64(size.Values[len(size.Values)-1].V)
	remainingGB := diskSizeGB - float64(last.V)
	secsToFull := remainingGB / growthPerSec
	estimate := last.T.Add(time.Duration(secsToFull * float64(time.Second)))
	days := int(time.Until(estimate).Hours() / 24)
	return fmt.Sprintf("%s (in %d days)", estimate.Format("2006-01-02"), days)
}
