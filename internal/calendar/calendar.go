package calendar

const (
	TimeFormatFullCalendar     = "2006-01-02T15:04:05-07:00"
	TimeFormatFullCalendarNoTZ = "2006-01-02T15:04:05"
)

// https://fullcalendar.io/docs/event-parsing
type Event struct {
	ID      string `json:"id"`
	AllDay  bool   `json:"allDay"`
	Start   string `json:"start"`
	End     string `json:"end,omitempty"`
	Title   string `json:"title"`
	URL     string `json:"url"`
	Display string `json:"display"`
}
