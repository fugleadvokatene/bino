package request

import (
	"context"
	"log/slog"
	"net/http"
)

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
	LogR(r, slog.LevelWarn, "method", r.Method, "path", r.URL.Path, "error", err)
}
