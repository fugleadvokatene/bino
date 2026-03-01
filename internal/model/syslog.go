package model

import "time"

type SysLogEntry struct {
	ID       int32
	Message  string
	Severity Severity
	Time     time.Time
}
