package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/handlers/handleraccess"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/request"
)

func (server *Server) postLanguageHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	lang, err := enums.ParseLanguageID(r.FormValue("language"))
	if err == nil {
		err = server.Queries.SetUserLanguage(ctx, db.SetUserLanguageParams{
			AppuserID:  commonData.User.AppuserID,
			LanguageID: int32(lang),
		})
		commonData.Language = language.Languages[int32(lang)]
	}

	if err != nil {
		commonData.Error(commonData.Language.LanguageUpdateFailed, err)
	}

	server.redirectToReferer(w, r)
}

func (server *Server) redirectToReferer(w http.ResponseWriter, r *http.Request) {
	server.redirect(w, r, r.Header.Get("Referer"))
}

func (server *Server) redirect(w http.ResponseWriter, r *http.Request, url string) {
	server.setFeedbackCookie(w, r)
	http.Redirect(w, r, url, http.StatusFound)
}

func (server *Server) lastGoodURL(r *http.Request) string {
	// TODO: not this. Store last good URL in the cookie or something
	return r.Referer()
}

func (server *Server) renderError(w http.ResponseWriter, r *http.Request, commonData *request.CommonData, err error) {
	ctx := r.Context()
	w.WriteHeader(http.StatusInternalServerError)
	commonData.Subtitle = commonData.Language.GenericFailed
	_ = ErrorPage(commonData, err, server.lastGoodURL(r)).Render(ctx, w)
	request.LogError(r, err)
}

func (server *Server) renderUnauthorized(w http.ResponseWriter, r *http.Request, commonData *request.CommonData, err error) {
	ctx := r.Context()
	w.WriteHeader(http.StatusInternalServerError)
	_ = handleraccess.UnauthorizedPage(commonData, err, server.lastGoodURL(r)).Render(ctx, w)
	request.LogError(r, err)
}

func (server *Server) render404(w http.ResponseWriter, r *http.Request, commonData *request.CommonData, err error) {
	ctx := r.Context()
	w.WriteHeader(http.StatusNotFound)
	_ = NotFoundPage(commonData, err.Error(), server.lastGoodURL(r)).Render(ctx, w)
	request.LogError(r, err)
}

func (server *Server) ensureAccess(w http.ResponseWriter, r *http.Request, al enums.AccessLevel) bool {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	hasAccess := commonData.User.AccessLevel >= al
	if !hasAccess {
		w.WriteHeader(http.StatusUnauthorized)
		err := errors.New(commonData.Language.AccessLevelBlocked(al))
		_ = handleraccess.UnauthorizedPage(
			commonData,
			err,
			server.lastGoodURL(r),
		).Render(ctx, w)
		request.LogError(r, err)
	}
	return hasAccess
}

func ajaxError(w http.ResponseWriter, r *http.Request, err error, statusCode int) {
	request.LogError(r, err)
	w.WriteHeader(statusCode)
}

func (server *Server) fourOhFourHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	server.render404(w, r, commonData, fmt.Errorf("not found: %s %s", r.Method, r.RequestURI))
}

func jsonHandler[T any](
	server *Server,
	w http.ResponseWriter,
	r *http.Request,
	f func(q *db.Queries, req T) error,
) {
	ctx := r.Context()

	bytes, err := io.ReadAll(r.Body)
	if err != nil {
		ajaxError(w, r, err, http.StatusBadRequest)
		return
	}
	var recv T
	if err := json.Unmarshal(bytes, &recv); err != nil {
		ajaxError(w, r, err, http.StatusBadRequest)
		return
	}
	if err := server.Transaction(ctx, func(ctx context.Context, q *db.Queries) error {
		return f(q, recv)
	}); err != nil {
		ajaxError(w, r, err, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
