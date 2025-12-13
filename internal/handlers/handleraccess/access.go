package handleraccess

import (
	"errors"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/request"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	commonData.Subtitle = commonData.Language.AccessLevel
	_ = AccessLevelPage(commonData).Render(ctx, w)
}

func Unauthorized(w http.ResponseWriter, r *http.Request, err error) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	w.WriteHeader(http.StatusInternalServerError)
	_ = UnauthorizedPage(commonData, err, request.LastGoodURL(r)).Render(ctx, w)
	request.LogError(r, err)
}

func EnsureAccess(w http.ResponseWriter, r *http.Request, al enums.AccessLevel) bool {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	hasAccess := commonData.User.AccessLevel >= al
	if !hasAccess {
		w.WriteHeader(http.StatusUnauthorized)
		err := errors.New(commonData.Language.AccessLevelBlocked(al))
		_ = UnauthorizedPage(
			commonData,
			err,
			request.LastGoodURL(r),
		).Render(ctx, w)
		request.LogError(r, err)
	}
	return hasAccess
}
