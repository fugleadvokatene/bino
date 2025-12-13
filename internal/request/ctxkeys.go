package request

import (
	"context"
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/cookies"
)

type ctxKey int32

const (
	ctxKeyCommonData ctxKey = iota
)

func WithCommonData(ctx context.Context, cd *CommonData, cookieStore *cookies.CookieStore, w http.ResponseWriter, r *http.Request) context.Context {
	var feedback Feedback
	if _, err := cookieStore.Eat(w, r, "feedback", "json", &feedback); err != nil {
		cd.Log("failed to unmarshal feedback cookie: %v", err)
		return ctx
	}

	// Prepend the feedback from the cookie, since that happened before this request
	cd.Feedback.Items = append(feedback.Items, cd.Feedback.Items...)
	if len(cd.Feedback.Items) > 10 {
		cd.Feedback.Items = cd.Feedback.Items[:10]
		cd.Feedback.NSkipped += len(cd.Feedback.Items) - 10
	}

	cd.Cookies = UserCookies{
		Store: cookieStore,
		W:     w,
		R:     r,
	}

	return context.WithValue(ctx, ctxKeyCommonData, cd)
}

func LoadCommonData(ctx context.Context) (*CommonData, error) {
	cd, ok := ctx.Value(ctxKeyCommonData).(*CommonData)
	if !ok {
		return nil, fmt.Errorf("no CommonData in ctx")
	}
	return cd, nil
}

func MustLoadCommonData(ctx context.Context) *CommonData {
	cd, err := LoadCommonData(ctx)
	if err != nil {
		panic(err)
	}
	return cd
}
