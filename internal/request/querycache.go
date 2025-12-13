package request

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/model"
)

type Backend interface {
	EmailToUserMapping(ctx context.Context) (map[string]model.User, error)
}

func EmailToUserMapping(ctx context.Context, backend Backend) map[string]model.User {
	commonData := MustLoadCommonData(ctx)
	if commonData.QueryCache.EmailToUser == nil {
		if mapping, err := backend.EmailToUserMapping(ctx); err != nil {
			LogCtx(ctx, "GetAppusers failed: %v", err)
		} else {
			commonData.QueryCache.EmailToUser = mapping
		}
	}
	return commonData.QueryCache.EmailToUser
}

func LookupUserByEmail(ctx context.Context, backend Backend, email string) model.User {
	return EmailToUserMapping(ctx, backend)[email]
}
