package main

import (
	"context"
	"fmt"

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
		self             view.User
		emailToUser      map[string]view.User
		canCreateJournal bool
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

func (server *Server) getUserViews(ctx context.Context) map[string]view.User {
	commonData := MustLoadCommonData(ctx)
	if commonData.QueryCache.emailToUser == nil {
		users, err := server.Queries.GetAppusers(ctx)
		if err == nil {
			commonData.QueryCache.emailToUser = SliceToMap(users, func(user GetAppusersRow) (string, view.User) {
				return user.Email, user.ToUserView()
			})
		} else {
			LogCtx(ctx, "GetAppusers failed: %w", err)
		}
	}
	return commonData.QueryCache.emailToUser
}

func (server *Server) lookupUserByEmail(ctx context.Context, email string) view.User {
	return server.getUserViews(ctx)[email]
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

type UserData struct {
	AppuserID       int32
	DisplayName     string
	PreferredHome   Home
	Homes           []Home
	Email           string
	LoggingConsent  bool
	AvatarURL       string
	HasAvatarURL    bool
	HasGDriveAccess bool
	AccessLevel     enums.AccessLevel
}

func (u *UserData) HasHomeOrAccess(homeID int32, al enums.AccessLevel) bool {
	if len(u.Homes) > 0 && u.PreferredHome.ID == homeID {
		return true
	}
	if u.AccessLevel >= al {
		return true
	}
	return false
}

type LanguageView struct {
	ID       int32
	Emoji    string
	SelfName string
}
