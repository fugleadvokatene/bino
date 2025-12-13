package handlercalendar

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/calendar"
	"github.com/fugleadvokatene/bino/internal/request"
)

type Backend interface {
	GetUnavailablePeriodsInRange(ctx context.Context, start, end time.Time) ([]calendar.Event, error)
}

func Handler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	commonData.Subtitle = commonData.Language.Calendar

	initialtime := time.Now().Format(calendar.TimeFormatFullCalendarNoTZ)
	if altTime, err := request.GetQueryValue(r, "t"); err == nil {
		initialtime = altTime
	}
	initialview := "dayGridMonth"
	if altView, err := request.GetQueryValue(r, "v"); err == nil {
		initialview = altView
	}

	_ = CalendarPage(commonData, initialtime, initialview).Render(ctx, w)
}

func AjaxCalendarAway(w http.ResponseWriter, r *http.Request, backend Backend) {
	start, end, err := CalendarRange(r)
	if err != nil {
		request.LogError(r, err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	out, err := backend.GetUnavailablePeriodsInRange(r.Context(), start, end)
	if err != nil {
		request.LogError(r, err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	bin, err := json.Marshal(out)
	if err != nil {
		request.LogError(r, err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Write(bin)
}

func CalendarRange(r *http.Request) (time.Time, time.Time, error) {
	start, startErr := request.GetQueryValue(r, "start")
	end, endErr := request.GetQueryValue(r, "end")

	startT, startParseErr := time.Parse(calendar.TimeFormatFullCalendar, start)
	endT, endParseErr := time.Parse(calendar.TimeFormatFullCalendar, end)

	err := errors.Join(startErr, endErr)
	if err == nil {
		err = errors.Join(startParseErr, endParseErr)
	}

	return startT, endT, err
}
