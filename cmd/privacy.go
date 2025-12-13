package main

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/request"
)

type PrivacyConfig struct {
	LogDeletionPolicy   int32
	RevokeConsentPolicy int32
}

func (server *Server) privacyHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	commonData.Subtitle = commonData.Language.FooterPrivacy
	_ = Privacy(commonData, server.Config.Privacy).Render(ctx, w)
}

func (server *Server) tosHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	commonData.Subtitle = commonData.Language.FooterTOS
	_ = TOS(commonData).Render(ctx, w)
}

func (server *Server) loginPageHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	_ = LoginPage(commonData).Render(ctx, w)
}

func (server *Server) postPrivacyHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	consent := server.getCheckboxValue(r, "logging-consent")

	var err error
	if consent {
		err = server.Queries.SetLoggingConsent(ctx, db.SetLoggingConsentParams{
			ID:     commonData.User.AppuserID,
			Period: server.Config.Privacy.RevokeConsentPolicy,
		})
	} else {
		err = server.Queries.RevokeLoggingConsent(ctx, commonData.User.AppuserID)
	}
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	server.redirectToReferer(w, r)
}
