package request

import (
	"fmt"
	"log/slog"

	"github.com/a-h/templ"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/model"
)

type CommonData struct {
	BuildKey string

	// nil if logged out
	User *UserData

	Language *language.Language
	Subtitle string
	// Cached result of queries that might be called more than once
	QueryCache struct {
		Self        model.User
		EmailToUser map[string]model.User
	}
	Feedback Feedback

	Cookies UserCookies
}

func (cd *CommonData) Error(msg string, err error) {
	cd.Log(slog.LevelWarn, "User saw an error", "error", err, "usermessage", msg)
	cd.SetFeedback(model.FBError, msg)
}

func (cd *CommonData) Warning(msg string, err error) {
	cd.Log(slog.LevelWarn, "User saw a warning", "error", err, "usermessage", msg)
	cd.SetFeedback(model.FBWarning, msg)
}

func (cd *CommonData) Success(msg string) {
	cd.SetFeedback(model.FBSuccess, msg)
}

func (cd *CommonData) Info(msg string) {
	cd.SetFeedback(model.FBInfo, msg)
}

func (cd *CommonData) SetFeedback(fbt model.FB, msg string) {
	if n := len(cd.Feedback.Items); n < 10 {
		// Filter dupes
		for i := range n {
			if cd.Feedback.Items[i].Message == msg {
				cd.Feedback.NSkipped++
				return
			}
		}

		cd.Feedback.Items = append(cd.Feedback.Items, FeedbackItem{
			Message: msg,
			Type:    fbt,
		})
	} else {
		cd.Feedback.NSkipped++
	}
}

func (cd *CommonData) StaticFile(name string) templ.SafeURL {
	return templ.URL(fmt.Sprintf("/static/%s/%s", cd.BuildKey, name))
}

func (cd *CommonData) Lang() model.LanguageID {
	return cd.Language.ID
}

func (cd *CommonData) Lang32() int32 {
	return int32(cd.Language.ID)
}

// Log if the user has given explicit concent
func (cd *CommonData) Log(level slog.Level, message string, args ...any) {
	if cd == nil {
		return
	}
	if cd.User == nil {
		return
	}
	if !cd.User.LoggingConsent {
		return
	}
	slog.Log(cd.Cookies.R.Context(), level, message, args...)
}

type UserData struct {
	AppuserID       int32
	DisplayName     string
	PreferredHome   model.Home
	Email           string
	LoggingConsent  bool
	AvatarURL       string
	HasAvatarURL    bool
	HasGDriveAccess bool
	AccessLevel     model.AccessLevel
	FeatureFlags    generic.Set[string]
}

func (u *UserData) HasHomeOrAccess(homeID int32, al model.AccessLevel) bool {
	if u.PreferredHome.ID == homeID {
		return true
	}
	if u.AccessLevel >= al {
		return true
	}
	return false
}

func (cd *CommonData) SaveFeedback() {
	if err := cd.Cookies.Set("feedback", "json", cd.Feedback); err != nil {
		cd.Log(slog.LevelError, "Saving feedback cookie", "err", err)
		return
	}
}

func (cd *CommonData) FeatureFlag(flag string) bool {
	_, found := cd.User.FeatureFlags[flag]
	return found
}
