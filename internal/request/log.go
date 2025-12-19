package request

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
)

var badLogErrorCall = errors.New("called LogError on nil err")

// Log from request if the user has given explicit concent
func LogR(r *http.Request, level slog.Level, format string, args ...any) {
	LogCtx(r.Context(), level, format, args...)
}

// Log from context if the user has given explicit concent
func LogCtx(ctx context.Context, level slog.Level, message string, args ...any) {
	commonData, err := LoadCommonData(ctx)
	if err != nil {
		return
	}
	commonData.Log(level, message, args...)
}

func LogError(r *http.Request, err error) {
	if err == nil {
		err = badLogErrorCall
	}
	LogR(r, slog.LevelWarn, err.Error(), "method", r.Method, "path", r.URL.Path)
}
