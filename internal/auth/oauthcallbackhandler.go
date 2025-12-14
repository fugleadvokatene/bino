package auth

import (
	"context"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type oauthCallbackHandler struct {
	auth *Authenticator
}

func NewOAuthCallbackHandler(
	auth *Authenticator,
) http.Handler {
	return &oauthCallbackHandler{
		auth: auth,
	}
}

func (h *oauthCallbackHandler) ServeHTTP(
	w http.ResponseWriter,
	r *http.Request,
) {
	ctx := r.Context()

	// Get OAuth token
	sess, _ := h.auth.cookies.Backend.Get(r, "auth")
	code := r.URL.Query().Get("code")
	token, err := h.auth.oauthConfig.Exchange(ctx, code)
	if err != nil {
		http.Error(w, "exchange failed", http.StatusUnauthorized)
		return
	}

	// Invalid token
	if !token.Valid() {
		http.Error(w, "invalid token", http.StatusBadRequest)
		return
	}
	if token.Expiry.IsZero() {
		http.Error(w, "no expiry set for token", http.StatusBadRequest)
		return
	}

	// Store the OAuth token for Drive API access
	tokenJSON, err := json.Marshal(token)
	if err != nil {
		http.Error(w, "token serialization failed", http.StatusInternalServerError)
		return
	}

	// Get the ID token
	rawIDToken, ok := token.Extra("id_token").(string)
	if !ok {
		http.Error(w, "no id_token", http.StatusUnauthorized)
		return
	}
	idToken, err := h.auth.tokenVerifier.Verify(ctx, rawIDToken)
	if err != nil {
		http.Error(w, "verify failed", http.StatusUnauthorized)
	}

	// Get stuff associated with the ID token
	var claims struct {
		Sub     string `json:"sub"`
		Email   string `json:"email"`
		Name    string `json:"name"`
		Picture string `json:"picture"`
	}
	if err := idToken.Claims(&claims); err != nil {
		http.Error(w, "claims failed", http.StatusUnauthorized)
		return
	}

	// User must exist or be invited
	userID, err := h.auth.db.Q.GetUserIDByEmail(ctx, claims.Email)
	if err == nil {
		// User exists; update personal data
		if err := h.auth.db.Q.UpdateUser(ctx, sql.UpdateUserParams{
			ID:          userID,
			GoogleSub:   claims.Sub,
			Email:       claims.Email,
			DisplayName: claims.Name,
			AvatarUrl:   pgtype.Text{String: claims.Picture, Valid: claims.Picture != ""},
		}); err != nil {
			http.Error(w, "creating user failed", http.StatusInternalServerError)
			return
		}
	} else if invitation, err := h.auth.db.Q.GetInvitation(ctx, pgtype.Text{String: claims.Email, Valid: true}); err == nil {
		// User has been invited; create user
		if err := h.auth.db.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
			if createdUserID, err := h.auth.db.Q.CreateUser(ctx, sql.CreateUserParams{
				DisplayName: claims.Name,
				Email:       claims.Email,
				GoogleSub:   claims.Sub,
				AvatarUrl:   pgtype.Text{String: claims.Picture, Valid: claims.Picture != ""},
				AccessLevel: int32(model.AccessLevelCoordinator),
			}); err != nil {
				return err
			} else {
				userID = createdUserID
			}
			if err := h.auth.db.Q.DeleteInvitation(ctx, invitation); err != nil {
				return err
			}
			return nil
		}); err != nil {
			http.Error(w, "creating user failed", http.StatusInternalServerError)
			return
		}
	} else {
		fmt.Printf("no inv for %s\n", claims.Email)
		http.Error(w, "user doesn't exist and is not invited", http.StatusUnauthorized)
		return
	}

	// Create session
	sessionID := rand.Text()
	if err := h.auth.db.Q.InsertSession(ctx, sql.InsertSessionParams{
		ID:        sessionID,
		AppuserID: userID,
		Expires:   pgtype.Timestamptz{Time: time.Now().AddDate(0, 1, 0), Valid: true},
	}); err != nil {
		http.Error(w, "creating session failed", http.StatusInternalServerError)
		return
	}

	// Store to cookie
	sess.Values["oauth_token"] = string(tokenJSON)
	sess.Values["session_id"] = sessionID
	sess.Values["email"] = claims.Email
	_ = sess.Save(r, w)

	http.Redirect(w, r, "/", http.StatusFound)
}
