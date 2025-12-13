package request

import (
	"context"
	"net/http"
)

// Log from request if the user has given explicit concent
func LogR(r *http.Request, format string, args ...any) {
	LogCtx(r.Context(), format, args...)
}

// Log from context if the user has given explicit concent
func LogCtx(ctx context.Context, format string, args ...any) {
	commonData, err := LoadCommonData(ctx)
	if err != nil {
		return
	}
	commonData.Log(format, args...)
}

func LogError(r *http.Request, err error) {
	LogR(r, "%s %s ERROR: %v", r.Method, r.URL.Path, err)
}
