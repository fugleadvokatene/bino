package handlerlanguage

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
)

type post struct {
	DB *db.Database
}

func (h *post) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	lang, err := model.ParseLanguageID(r.FormValue("language"))
	if err == nil {
		err = h.DB.SetUserLanguage(ctx, commonData.User.AppuserID, lang)
		commonData.Language = language.Languages[int32(lang)]
	}

	if err != nil {
		commonData.Error(commonData.Language.LanguageUpdateFailed, err)
	}

	request.RedirectToReferer(w, r)
}
