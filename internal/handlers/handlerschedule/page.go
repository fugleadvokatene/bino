package handlerschedule

import (
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type page struct {
	DB *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	commonData.Subtitle = commonData.Language.TasksHeader

	homeID := commonData.User.PreferredHome.ID
	schedules, err := h.DB.Q.GetAllActiveSchedules(ctx, pgtype.Int4{Int32: homeID, Valid: homeID != 0})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	now := time.Now()
	var overdue, upcoming []sql.GetAllActiveSchedulesRow
	for _, s := range schedules {
		if s.NextDueAt.Valid && s.NextDueAt.Time.Before(now) {
			overdue = append(overdue, s)
		} else {
			upcoming = append(upcoming, s)
		}
	}

	SchedulePage(ctx, commonData, overdue, upcoming).Render(ctx, w)
}
