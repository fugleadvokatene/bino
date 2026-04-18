package auth

import (
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/jackc/pgx/v5/pgtype"
)

func Authenticate(
	w http.ResponseWriter,
	r *http.Request,
	auth *Authenticator,
	buildKey string,
) (request.CommonData, error) {
	ctx := r.Context()

	user, session, err := GetUser(w, r, auth)

	if err != nil {
		fmt.Printf("redirecting to login\n")
		request.Redirect(w, r, "/")
		return request.CommonData{}, err
	}

	preferredHome, err := auth.db.Q.GetHomeForUser(ctx, user.ID)
	if err != nil {
		slog.WarnContext(ctx, "user is not assigned to any home", "id", user.ID, "err", err)
	}

	featureFlags, err := auth.db.GetFeatureFlagsForUser(ctx, user.ID)
	if err != nil {
		featureFlags = nil
	}

	homeConfig, err := auth.db.GetHomeConfig(ctx, preferredHome.ID)
	if err != nil {
		slog.WarnContext(ctx, "could not load home config", "id", preferredHome.ID, "err", err)
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
		TaskManagement:  homeConfig.TaskManagement,
	}

	overdueCount, err := auth.db.Q.CountOverdueSchedules(ctx, pgtype.Int4{Int32: preferredHome.ID, Valid: preferredHome.ID != 0})
	if err != nil {
		overdueCount = 0
	}

	commonData := request.CommonData{
		User:                 &userData,
		BuildKey:             buildKey,
		Language:             language.GetLanguage(user.LanguageID.Int32),
		OutstandingTaskCount: int(overdueCount),
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
