package handlercalendar

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/calendar"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/request"
)

type Page struct {
}

func (h *Page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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

type AjaxAway struct {
	DB *db.Database
}

func (h *AjaxAway) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	start, end, err := CalendarRange(r)
	if err != nil {
		request.LogError(r, err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	out, err := h.DB.GetUnavailablePeriodsInRange(r.Context(), start, end, commonData.Language)
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

type AjaxPatientEvents struct {
	DB *db.Database
}

func (h *AjaxPatientEvents) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	start, end, err := CalendarRange(r)
	if err != nil {
		request.LogError(r, err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	out, err := h.DB.GetEventsForCalendar(ctx, start, end, commonData.Language)
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
