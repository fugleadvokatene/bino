package auth

import (
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func Authenticate(
	w http.ResponseWriter,
	r *http.Request,
	auth *Authenticator,
	loginRedirectHandler http.Handler,
	buildKey string,
) (request.CommonData, error) {
	ctx := r.Context()

	user, session, err := GetUser(w, r, auth)

	if err != nil {
		loginRedirectHandler.ServeHTTP(w, r)
		return request.CommonData{}, err
	}

	homes, err := auth.db.Q.GetHomesForUser(ctx, user.ID)
	var preferredHome sql.Home
	if len(homes) > 0 {
		preferredHome = homes[0]
	}

	featureFlags, err := auth.db.GetFeatureFlagsForUser(ctx, user.ID)
	if err != nil {
		featureFlags = nil
	}

	loggingConsent := user.LoggingConsent.Valid && user.LoggingConsent.Time.After(time.Now())

	userData := request.UserData{
		AppuserID:       user.ID,
		DisplayName:     user.DisplayName,
		Email:           user.Email,
		AvatarURL:       user.AvatarUrl.String,
		HasAvatarURL:    user.AvatarUrl.Valid,
		HasGDriveAccess: user.HasGdriveAccess,
		PreferredHome:   preferredHome.ToModel(),
		LoggingConsent:  loggingConsent,
		AccessLevel:     model.AccessLevel(user.AccessLevel),
		FeatureFlags:    featureFlags,
		CSRFToken:       session.Csrf.String,
		CSRFCheckPassed: false,
	}

	commonData := request.CommonData{
		User:     &userData,
		BuildKey: buildKey,
		Language: language.GetLanguage(user.LanguageID),
	}

	if val, ok := r.URL.Query()["_AL"]; ok && len(val) == 1 {
		if val[0] == "LoggedOut" {
			commonData.User = nil
		}
		if demotedAccessLevel, err := model.ParseAccessLevel(val[0]); err == nil && commonData.User.AccessLevel >= demotedAccessLevel {
			commonData.User.AccessLevel = demotedAccessLevel
		}
	}

	return commonData, err
}
