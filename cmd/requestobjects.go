package main

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/view"
)

func (server *Server) getUserViews(ctx context.Context) map[string]view.User {
	commonData := request.MustLoadCommonData(ctx)
	if commonData.QueryCache.EmailToUser == nil {
		users, err := server.Queries.GetAppusers(ctx)
		if err == nil {
			commonData.QueryCache.EmailToUser = SliceToMap(users, func(user db.GetAppusersRow) (string, view.User) {
				return user.Email, user.ToUserView()
			})
		} else {
			request.LogCtx(ctx, "GetAppusers failed: %w", err)
		}
	}
	return commonData.QueryCache.EmailToUser
}

func (server *Server) lookupUserByEmail(ctx context.Context, email string) view.User {
	return server.getUserViews(ctx)[email]
}

type LanguageView struct {
	ID       int32
	Emoji    string
	SelfName string
}
