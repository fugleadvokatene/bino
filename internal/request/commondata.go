package request

import (
	"context"
	"fmt"
	"log"

	"github.com/a-h/templ"
	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/view"
)

type ctxKey int32

const (
	ctxKeyCommonData ctxKey = iota
)

func WithCommonData(ctx context.Context, cd *CommonData) context.Context {
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

type CommonData struct {
	BuildKey string

	// nil if logged out
	User *UserData

	Language *language.Language
	Subtitle string
	// Cached result of queries that might be called more than once
	QueryCache struct {
		Self        view.User
		EmailToUser map[string]view.User
	}
	Feedback Feedback
}

func (cd *CommonData) Error(msg string, err error) {
	cd.Log("Showed user ERROR: err=%v, message to user=%s", err, msg)
	cd.SetFeedback(enums.FBError, msg)
}

func (cd *CommonData) Warning(msg string, err error) {
	cd.Log("Showed user WARNING: err=%v, message to user=%s", err, msg)
	cd.SetFeedback(enums.FBWarning, msg)
}

func (cd *CommonData) Success(msg string) {
	cd.SetFeedback(enums.FBSuccess, msg)
}

func (cd *CommonData) Info(msg string) {
	cd.SetFeedback(enums.FBInfo, msg)
}

func (cd *CommonData) SetFeedback(fbt enums.FB, msg string) {
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

func (cd *CommonData) Lang() enums.LanguageID {
	return cd.Language.ID
}

func (cd *CommonData) Lang32() int32 {
	return int32(cd.Language.ID)
}

// Log if the user has given explicit concent
func (cd *CommonData) Log(format string, args ...any) {
	if cd == nil {
		return
	}
	if !cd.User.LoggingConsent {
		return
	}
	log.Printf(format, args...)
}

type UserData struct {
	AppuserID       int32
	DisplayName     string
	PreferredHome   view.Home
	Email           string
	LoggingConsent  bool
	AvatarURL       string
	HasAvatarURL    bool
	HasGDriveAccess bool
	AccessLevel     enums.AccessLevel
}

func (u *UserData) HasHomeOrAccess(homeID int32, al enums.AccessLevel) bool {
	if u.PreferredHome.ID == homeID {
		return true
	}
	if u.AccessLevel >= al {
		return true
	}
	return false
}
