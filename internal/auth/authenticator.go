package auth

import (
	"context"
	"encoding/json"
	"net/http"
	"os"

	"github.com/coreos/go-oidc"
	"github.com/fugleadvokatene/bino/internal/config"
	"github.com/fugleadvokatene/bino/internal/cookies"
	"github.com/fugleadvokatene/bino/internal/db"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var ProfileScopes = []string{
	"openid",
	"email",
	"profile",
}

type Authenticator struct {
	tokenVerifier *oidc.IDTokenVerifier
	oauthConfig   *oauth2.Config
	cookies       *cookies.CookieStore
	db            *db.Database
}

func New(
	ctx context.Context,
	config config.AuthConfig,
	db *db.Database,
) (*Authenticator, error) {
	cookies, err := cookies.New(config.SessionKeyLocation)
	if err != nil {
		return nil, err
	}

	provider, err := oidc.NewProvider(ctx, "https://accounts.google.com")
	if err != nil {
		return nil, err
	}

	f, err := os.Open(config.OAuthCredentialsLocation)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	var oauthCredentials struct {
		Web struct {
			ClientID     string   `json:"client_id"`
			ClientSecret string   `json:"client_secret"`
			RedirectURIs []string `json:"redirect_uris"`
		} `json:"web"`
	}
	err = json.NewDecoder(f).Decode(&oauthCredentials)

	redirectURI := config.OAuthRedirectURI
	if redirectURI == "" {
		redirectURI = oauthCredentials.Web.RedirectURIs[0]
	}

	return &Authenticator{
		tokenVerifier: provider.Verifier(&oidc.Config{
			ClientID: oauthCredentials.Web.ClientID,
		}),
		oauthConfig: &oauth2.Config{
			ClientID:     oauthCredentials.Web.ClientID,
			ClientSecret: oauthCredentials.Web.ClientSecret,
			RedirectURL:  redirectURI,
			Endpoint:     google.Endpoint,
			Scopes:       ProfileScopes,
		},
		cookies: cookies,
		db:      db,
	}, nil
}

func (auth *Authenticator) NewServeMux() *http.ServeMux {
	mux := http.NewServeMux()
	loginRedirectHandler := NewLoginRedirectHandler(auth)
	logoutHandler := NewLogOutHandler(auth.cookies)
	oauthCallbackHandler := NewOAuthCallbackHandler(auth)
	mux.Handle("GET /login", loginRedirectHandler)
	mux.Handle("POST /login", loginRedirectHandler)
	mux.Handle("GET /AuthLogOut", logoutHandler)
	mux.Handle("POST /AuthLogOut", logoutHandler)
	mux.Handle("GET /oauth2/callback", oauthCallbackHandler)
	mux.Handle("POST /oauth2/callback", oauthCallbackHandler)
	return mux
}
