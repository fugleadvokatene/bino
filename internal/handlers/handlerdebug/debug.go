package handlerdebug

import (
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
		debug.GetDebugInfo(ctx, h.ConstantInfo),
		timeSeries,
	).Render(ctx, w)
}
