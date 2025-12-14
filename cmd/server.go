package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"slices"
	"time"

	"github.com/coreos/go-oidc"
	"github.com/fugleadvokatene/bino/internal/config"
	"github.com/fugleadvokatene/bino/internal/cookies"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/debug"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/handlers/handleraccess"
	"github.com/fugleadvokatene/bino/internal/handlers/handleradminroot"
	"github.com/fugleadvokatene/bino/internal/handlers/handlercalendar"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerdashboard"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerdebug"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerevent"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerfile"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerformerpatients"
	"github.com/fugleadvokatene/bino/internal/handlers/handlergdriveadmin"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerhome"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerhomeadmin"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerimport"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerlanguage"
	"github.com/fugleadvokatene/bino/internal/handlers/handlermain"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerpatient"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerprivacy"
	"github.com/fugleadvokatene/bino/internal/handlers/handlersearch"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerspeciesadmin"
	"github.com/fugleadvokatene/bino/internal/handlers/handlertos"
	"github.com/fugleadvokatene/bino/internal/handlers/handleruser"
	"github.com/fugleadvokatene/bino/internal/handlers/handleruseradmin"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerwiki"
	"github.com/fugleadvokatene/bino/internal/route"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

const OIDCURL = "https://accounts.google.com"

var ProfileScopes = []string{
	"openid",
	"email",
	"profile",
}

type Server struct {
	DB                *db.Database
	Cookies           cookies.CookieStore
	OAuthConfig       *oauth2.Config
	TokenVerifier     *oidc.IDTokenVerifier
	GDriveWorker      *gdrive.Worker
	FileBackend       fs.FileStorage
	ConstantDebugInfo debug.ConstantInfo
	BuildKey          string
	Config            config.Config
}

type Middleware = func(http.Handler) http.Handler

var ErrUnauthorized = errors.New("unauthorized")
var ErrInternalServerError = errors.New("internal server error")

func getStatusCode(err error) int {
	if err == nil {
		return http.StatusOK
	}
	if errors.Is(err, ErrUnauthorized) {
		return http.StatusUnauthorized
	}
	return http.StatusInternalServerError
}

func startServer(
	ctx context.Context,
	conn *pgxpool.Pool,
	db *db.Database,
	gdriveWorker *gdrive.Worker,
	fileBackend fs.FileStorage,
	config config.Config,
	buildKey string,
) error {
	c, err := loadCreds(config.Auth.OAuthCredentialsLocation)
	if err != nil {
		return err
	}

	provider, err := oidc.NewProvider(ctx, OIDCURL)
	if err != nil {
		return err
	}

	sessionKey, err := os.ReadFile(config.Auth.SessionKeyLocation)
	if err != nil {
		return err
	}

	redirectURI := config.Auth.OAuthRedirectURI
	if redirectURI == "" {
		redirectURI = c.Web.RedirectURIs[0]
	}

	server := &Server{
		DB:           db,
		Cookies:      cookies.NewCookieStore(sessionKey),
		GDriveWorker: gdriveWorker,
		OAuthConfig: &oauth2.Config{
			ClientID:     c.Web.ClientID,
			ClientSecret: c.Web.ClientSecret,
			RedirectURL:  redirectURI,
			Endpoint:     google.Endpoint,
			Scopes:       ProfileScopes,
		},
		TokenVerifier: provider.Verifier(&oidc.Config{
			ClientID: c.Web.ClientID,
		}),
		ConstantDebugInfo: debug.NewRuntimeInfo(),
		FileBackend:       fileBackend,
		BuildKey:          buildKey,
		Config:            config,
	}

	mux := http.NewServeMux()

	// Set up auth middlewares
	baseFlow := []Middleware{server.requireLogin, WithLogging}
	publicFlow := []Middleware{func(h http.Handler) http.Handler {
		return server.tryLogin(h, server.requireLogin)
	}}

	// Main page
	mux.Handle("GET /{$}", Chain(&handlermain.Handler{Dashboard: &handlerdashboard.Page{DB: db}}, publicFlow...))

	// Login flow
	mux.Handle("GET /login", Chainf(server.loginHandler))
	mux.Handle("POST /login", Chainf(server.loginHandler))
	mux.Handle("GET /AuthLogOut", Chainf(server.AuthLogOutHandler))
	mux.Handle("POST /AuthLogOut", Chainf(server.AuthLogOutHandler))
	mux.Handle("GET /oauth2/callback", Chainf(server.callbackHandler))
	mux.Handle("POST /oauth2/callback", Chainf(server.callbackHandler))

	// Privacy policy
	mux.Handle("GET /privacy", Chain(&handlerprivacy.Page{Config: server.Config.Privacy}, publicFlow...))
	mux.Handle("GET /tos", Chainf(handlertos.Handler, publicFlow...))
	mux.Handle("GET /access", Chainf(handleraccess.Handler, baseFlow...))

	// Static content
	staticDir := fmt.Sprintf("/static/%s/", buildKey)
	mux.Handle("GET "+staticDir, http.StripPrefix(staticDir, http.FileServer(http.Dir(config.HTTP.StaticDir))))

	// Files
	mux.Handle("GET /file/{id}/{filename}", Chain(&handlerfile.Read{DB: db, FileBackend: fileBackend}, baseFlow...))

	// Logged-in content modules
	for _, routes := range [][]route.Route{
		handleradminroot.Routes(),
		handlercalendar.Routes(db),
		handlerdashboard.Routes(db, gdriveWorker, &server.Config),
		handlerdebug.Routes(server.ConstantDebugInfo),
		handlerevent.Routes(db),
		handlerfile.Routes(db, fileBackend),
		handlerformerpatients.Routes(db),
		handlergdriveadmin.Routes(db, gdriveWorker),
		handlerhome.Routes(db),
		handlerhomeadmin.Routes(db),
		handlerimport.Routes(db),
		handlerlanguage.Routes(db),
		handlerpatient.Routes(db, gdriveWorker, &config),
		handlerprivacy.Routes(db, config.Privacy),
		handlersearch.Routes(db),
		handlerspeciesadmin.Routes(db),
		handleruser.Routes(db),
		handleruseradmin.Routes(db),
		handlerwiki.Routes(db, fileBackend),
	} {
		for _, route := range routes {
			requirements := slices.Clone(baseFlow)
			requirements = append(requirements, server.requireCapability(route.Cap))
			mux.Handle(route.Path, Chain(route.Handler, requirements...))
		}
	}

	// 404
	mux.Handle("GET /", Chainf(func(w http.ResponseWriter, r *http.Request) {
		handlererror.NotFound(w, r, fmt.Errorf("not found: %s %s", r.Method, r.RequestURI))
	}, publicFlow...))
	mux.Handle("POST /", Chainf(func(w http.ResponseWriter, r *http.Request) {
		handlererror.NotFound(w, r, fmt.Errorf("not found: %s %s", r.Method, r.RequestURI))
	}, publicFlow...))

	go func() {
		handler := Chain(mux, WithRecover)
		srv := &http.Server{
			Addr:              config.HTTP.URL,
			Handler:           handler,
			ReadTimeout:       config.HTTP.ReadTimeoutSeconds * time.Second,
			ReadHeaderTimeout: config.HTTP.ReadHeaderTimeoutSeconds * time.Second,
			WriteTimeout:      config.HTTP.WriteTimeoutSeconds * time.Second,
			IdleTimeout:       config.HTTP.IdleTimeoutSeconds * time.Second,
		}
		if err := srv.ListenAndServe(); err != nil {
			panic(err)
		}
	}()

	return nil
}
