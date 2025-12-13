package handlerprivacy

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/privacy"
	"github.com/fugleadvokatene/bino/internal/request"
)

type Page struct {
	Config privacy.Config
}

func (h *Page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	commonData.Subtitle = commonData.Language.FooterPrivacy
	_ = Privacy(commonData, h.Config).Render(ctx, w)
}

type Form struct {
	Config privacy.Config
	DB     *db.Database
}

func (h *Form) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	consent := request.GetCheckboxValue(r, "logging-consent")

	err := h.DB.SetLoggingConsent(ctx, commonData.User.AppuserID, consent, h.Config.RevokeConsentPolicy)

	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
