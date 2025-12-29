package auth

import (
	"crypto/rand"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/sql"
	"golang.org/x/oauth2"
)

func GetUser(
	w http.ResponseWriter,
	r *http.Request,
	auth *Authenticator,
) (sql.Appuser, sql.Session, error) {
	// Get the encrypted auth cookie
	ctx := r.Context()

	sess, _ := auth.cookies.Backend.Get(r, "auth")

	// OAuth token data must be valid
	tokenData, ok := sess.Values["oauth_token"].(string)
	if !ok {
		return sql.Appuser{}, sql.Session{}, fmt.Errorf("no OAuth token in session")
	}
	var token oauth2.Token
	if err := json.Unmarshal([]byte(tokenData), &token); err != nil {
		return sql.Appuser{}, sql.Session{}, fmt.Errorf("correpted OAuth token in session")
	}

	ts := oauth2.ReuseTokenSource(&token, auth.oauthConfig.TokenSource(ctx, &token))
	newTok, err := ts.Token()
	if err != nil {
		return sql.Appuser{}, sql.Session{}, fmt.Errorf("unable to refresh token: %w", err)
	}
	if newTok.AccessToken != token.AccessToken || newTok.Expiry != token.Expiry {
		b, err := json.Marshal(newTok)
		if err != nil {
			return sql.Appuser{}, sql.Session{}, fmt.Errorf("unable to marshal new token: %w", err)
		}
		sess.Values["oauth_token"] = string(b)
		_ = sess.Save(r, w)
	}

	// Look up session
	sessionIDIF, ok := sess.Values["session_id"]
	if !ok {
		return sql.Appuser{}, sql.Session{}, fmt.Errorf("unauthorized")
	}
	sessionID, ok := sessionIDIF.(string)
	if !ok {
		return sql.Appuser{}, sql.Session{}, fmt.Errorf("session_id is %T", sessionID)
	}
	session, err := auth.db.Q.GetSession(ctx, sessionID)
	if err != nil {
		return sql.Appuser{}, sql.Session{}, fmt.Errorf("%w: no such session %s", err, sessionID)
	}
	if time.Now().After(session.Expires.Time) {
		return sql.Appuser{}, sql.Session{}, fmt.Errorf("session expired")
	}
	if err := auth.db.Q.UpdateSessionLastSeen(ctx, sessionID); err != nil {
		return sql.Appuser{}, sql.Session{}, fmt.Errorf("updating session-last-seen failed")
	}

	// Transparently upgrade sessions to use CSRF token
	if !session.Csrf.Valid || session.Csrf.String == "" {
		session.Csrf.String = rand.Text()
		session.Csrf.Valid = true
		if err := auth.db.Q.UpdateSessionCSRF(ctx, sql.UpdateSessionCSRFParams{
			ID:   session.ID,
			Csrf: session.Csrf,
		}); err != nil {
			return sql.Appuser{}, sql.Session{}, fmt.Errorf("updating session CSRF token failed")
		}
	}

	// Look up user
	user, err := auth.db.Q.GetUser(ctx, session.AppuserID)
	if err != nil {
		return sql.Appuser{}, sql.Session{}, fmt.Errorf("database error: %w", err)
	}

	return user, session, nil
}
