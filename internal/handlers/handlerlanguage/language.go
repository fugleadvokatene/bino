package handlerlanguage

import (
	"context"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/request"
)

type Post struct {
	Backend interface {
		SetUserLanguage(ctx context.Context, user int32, language enums.LanguageID) error
	}
}

func (h *Post) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	lang, err := enums.ParseLanguageID(r.FormValue("language"))
	if err == nil {
		err = h.Backend.SetUserLanguage(ctx, commonData.User.AppuserID, lang)
		commonData.Language = language.Languages[int32(lang)]
	}

	if err != nil {
		commonData.Error(commonData.Language.LanguageUpdateFailed, err)
	}

	request.RedirectToReferer(w, r)
}
