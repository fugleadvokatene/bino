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
	"github.com/fugleadvokatene/bino/internal/cookies"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/debug"
	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/handlers/handleraccess"
	"github.com/fugleadvokatene/bino/internal/handlers/handleradminroot"
	"github.com/fugleadvokatene/bino/internal/handlers/handlercalendar"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerdebug"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerevent"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerlanguage"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerprivacy"
	"github.com/fugleadvokatene/bino/internal/handlers/handlertos"
	"github.com/jackc/pgx/v5"
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
	Conn              *pgxpool.Pool
	DB                *db.Database
	Cookies           cookies.CookieStore
	OAuthConfig       *oauth2.Config
	TokenVerifier     *oidc.IDTokenVerifier
	GDriveWorker      *GDriveWorker
	FileBackend       fs.FileStorage
	ConstantDebugInfo debug.ConstantInfo
	BuildKey          string
	Config            Config
}

type AuthConfig struct {
	SessionKeyLocation       string
	OAuthCredentialsLocation string
	ClientID                 string
	OAuthRedirectURI         string
}

type HTTPConfig struct {
	URL                      string
	ReadTimeoutSeconds       time.Duration
	ReadHeaderTimeoutSeconds time.Duration
	WriteTimeoutSeconds      time.Duration
	IdleTimeoutSeconds       time.Duration
	StaticDir                string
}

type Middleware = func(http.Handler) http.Handler

func (s *Server) Transaction(ctx context.Context, f func(ctx context.Context, q *db.Database) error) error {
	tx, err := s.Conn.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return fmt.Errorf("starting database transaction: %w", err)
	}
	db := &db.Database{Q: s.DB.Q.WithTx(tx)}
	err = f(ctx, db)
	if err == nil {
		err = tx.Commit(ctx)
	} else {
		tx.Rollback(ctx)
	}
	return err
}

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
	gdriveWorker *GDriveWorker,
	fileBackend fs.FileStorage,
	config Config,
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
	fmt.Printf("using redirect URL: %s\n", redirectURI)

	server := &Server{
		Conn:         conn,
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
	baseFlow := []Middleware{server.requireLogin, withLogging}

	publicFlow := []Middleware{func(h http.Handler) http.Handler {
		return server.tryLogin(h, server.requireLogin)
	}}

	requiresRehabber := slices.Clone(baseFlow)
	requiresRehabber = append(requiresRehabber, server.requireAccessLevel(enums.AccessLevelRehabber))

	requiresCoordinator := slices.Clone(baseFlow)
	requiresCoordinator = append(requiresCoordinator, server.requireAccessLevel(enums.AccessLevelCoordinator))

	requiresAdmin := slices.Clone(baseFlow)
	requiresAdmin = append(requiresAdmin, server.requireAccessLevel(enums.AccessLevelAdmin))

	loggedIn := func(handler http.Handler, cap enums.Cap) http.Handler {
		requirements := slices.Clone(baseFlow)
		requirements = append(requirements, server.requireCapability(cap))
		return chain(handler, requirements...)
	}

	loggedInf := func(handler http.HandlerFunc, cap enums.Cap) http.Handler {
		requirements := slices.Clone(baseFlow)
		requirements = append(requirements, server.requireCapability(cap))
		return chain(handler, requirements...)
	}

	// Abbreviations
	type W = http.ResponseWriter
	type R = http.Request

	//// PUBLIC
	// Pages
	mux.Handle("GET /{$}", chainf(server.mainHandler, publicFlow...))
	mux.Handle("GET /privacy", chain(&handlerprivacy.Page{Config: server.Config.Privacy}, publicFlow...))
	mux.Handle("GET /tos", chainf(handlertos.Handler, publicFlow...))
	mux.Handle("GET /access", chainf(handleraccess.Handler, baseFlow...))
	// Static content
	staticDir := fmt.Sprintf("/static/%s/", buildKey)
	mux.Handle("GET "+staticDir, http.StripPrefix(staticDir, http.FileServer(http.Dir(config.HTTP.StaticDir))))

	// User content
	mux.Handle("GET /file/{id}/{filename}", chainf(server.fileHandler, baseFlow...))

	//// LOGIN
	mux.Handle("GET /login", chainf(server.loginHandler))
	mux.Handle("POST /login", chainf(server.loginHandler))
	mux.Handle("GET /AuthLogOut", chainf(server.AuthLogOutHandler))
	mux.Handle("POST /AuthLogOut", chainf(server.AuthLogOutHandler))
	mux.Handle("GET /oauth2/callback", chainf(server.callbackHandler))
	mux.Handle("POST /oauth2/callback", chainf(server.callbackHandler))

	//// LOGGED-IN USER / REHABBER
	// Pages
	mux.Handle("GET /patient/{patient}", loggedInf(server.getPatientHandler, enums.CapViewAllActivePatients))
	mux.Handle("GET /home/{home}", loggedInf(server.getHomeHandler, enums.CapViewAllHomes))
	mux.Handle("GET /user/{user}", loggedInf(server.getUserHandler, enums.CapViewAllHomes))
	mux.Handle("GET /former-patients", loggedInf(server.formerPatientsHandler, enums.CapViewAllFormerPatients))
	mux.Handle("GET /calendar", loggedInf(handlercalendar.Page, enums.CapViewCalendar))
	mux.Handle("GET /import", loggedInf(server.getImportHandler, enums.CapUseImportTool))
	mux.Handle("GET /search", loggedInf(server.searchHandler, enums.CapSearch))
	mux.Handle("GET /search/live", loggedInf(server.searchLiveHandler, enums.CapSearch))
	mux.Handle("GET /file", loggedInf(server.filePage, enums.CapUploadFile))
	mux.Handle("GET /wiki", loggedInf(server.wikiMain, enums.CapEditWiki))
	mux.Handle("GET /wiki/view/{id}", loggedInf(server.wikiPage, enums.CapEditWiki))
	// Forms
	mux.Handle("POST /checkin", loggedInf(server.postCheckinHandler, enums.CapCheckInPatient))
	mux.Handle("POST /privacy", loggedIn(&handlerprivacy.Form{Backend: server.DB, Config: server.Config.Privacy}, enums.CapSetOwnPreferences))
	mux.Handle("POST /patient/{patient}/move", loggedInf(server.movePatientHandler, enums.CapManageOwnPatients))
	mux.Handle("POST /patient/{patient}/checkout", loggedInf(server.postCheckoutHandler, enums.CapManageOwnPatients))
	mux.Handle("POST /patient/{patient}/set-name", loggedInf(server.postSetNameHandler, enums.CapManageOwnPatients))
	mux.Handle("POST /patient/{patient}/create-journal", loggedInf(server.createJournalHandler, enums.CapCreatePatientJournal))
	mux.Handle("POST /patient/{patient}/attach-journal", loggedInf(server.attachJournalHandler, enums.CapManageOwnPatients))
	mux.Handle("POST /patient/{patient}/accept-suggested-journal", loggedInf(server.acceptSuggestedJournalHandler, enums.CapManageOwnPatients))
	mux.Handle("POST /patient/{patient}/decline-suggested-journal", loggedInf(server.declineSuggestedJournalHandler, enums.CapManageOwnPatients))
	mux.Handle("POST /event/{event}/set-note", loggedIn(&handlerevent.SetNote{Backend: server.DB}, enums.CapManageOwnPatients))
	mux.Handle("POST /home/{home}/set-capacity", loggedInf(server.setCapacityHandler, enums.CapManageOwnHomes))
	mux.Handle("POST /home/{home}/add-unavailable", loggedInf(server.addHomeUnavailablePeriodHandler, enums.CapManageOwnHomes))
	mux.Handle("POST /home/{home}/set-note", loggedInf(server.homeSetNoteHandler, enums.CapManageOwnHomes))
	mux.Handle("POST /home/{home}/species/add", loggedInf(server.addPreferredSpeciesHandler, enums.CapManageOwnHomes))
	mux.Handle("POST /home/{home}/species/delete/{species}", loggedInf(server.deletePreferredSpeciesHandler, enums.CapManageOwnHomes))
	mux.Handle("POST /home/{home}/species/reorder", loggedInf(server.reorderSpeciesHandler, enums.CapManageOwnHomes))
	mux.Handle("POST /period/{period}/delete", loggedInf(server.deleteHomeUnavailableHandler, enums.CapManageOwnHomes))
	mux.Handle("POST /import", loggedInf(server.postImportHandler, enums.CapUseImportTool))
	mux.Handle("POST /wiki/create", loggedInf(server.wikiCreate, enums.CapEditWiki))
	mux.Handle("POST /wiki/title/{id}", loggedInf(server.wikiSetTitle, enums.CapEditWiki))
	mux.Handle("POST /file/{id}/set-filename", loggedInf(server.fileSetFilename, enums.CapEditWiki))
	// Ajax
	mux.Handle("POST /language", loggedIn(&handlerlanguage.Post{Backend: server.DB}, enums.CapSetOwnPreferences))
	mux.Handle("POST /ajaxreorder", loggedInf(server.ajaxReorderHandler, enums.CapManageOwnPatients))
	mux.Handle("GET /calendar/away", loggedIn(&handlercalendar.AjaxCalendarAway{Backend: server.DB}, enums.CapViewCalendar))
	mux.Handle("GET /calendar/patientevents", loggedIn(&handlercalendar.AjaxCalendarPatientEvents{Backend: server.DB}, enums.CapViewCalendar))
	mux.Handle("GET /import/validation", loggedInf(server.ajaxImportValidateHandler, enums.CapViewCalendar))
	mux.Handle("POST /wiki/save/{id}", loggedInf(server.wikiSave, enums.CapEditWiki))
	mux.Handle("POST /wiki/fetchimage/{id}", loggedInf(server.wikiFetchImage, enums.CapEditWiki))
	mux.Handle("POST /wiki/uploadimage/{id}", loggedInf(server.wikiUploadImage, enums.CapEditWiki))
	// Filepond
	mux.Handle("POST /file/filepond", loggedInf(server.filepondProcess, enums.CapUploadFile))
	mux.Handle("DELETE /file/filepond", loggedInf(server.imageFilepondRevert, enums.CapUploadFile))
	mux.Handle("GET /file/filepond/{id}", loggedInf(server.imageFilepondRestore, enums.CapUploadFile))
	mux.Handle("POST /file/submit", loggedInf(server.filepondSubmit, enums.CapUploadFile))
	mux.Handle("POST /file/{id}/delete", loggedInf(server.fileDelete, enums.CapUploadFile))

	//// CONTENT MANAGEMENT
	// Pages
	mux.Handle("GET /species", loggedInf(server.getSpeciesHandler, enums.CapManageSpecies))
	mux.Handle("GET /admin", loggedInf(handleradminroot.Handler, enums.CapViewAdminTools))
	mux.Handle("GET /homes", loggedInf(server.getHomesHandler, enums.CapManageAllHomes))
	mux.Handle("GET /users", loggedInf(server.userAdminHandler, enums.CapManageUsers))
	// Forms
	mux.Handle("POST /homes", loggedInf(server.postHomeHandler, enums.CapManageAllHomes))
	mux.Handle("POST /homes/{home}/set-name", loggedInf(server.postHomeSetName, enums.CapManageOwnHomes))
	// Ajax
	mux.Handle("POST /species", loggedInf(server.postSpeciesHandler, enums.CapManageSpecies))
	mux.Handle("PUT /species", loggedInf(server.putSpeciesHandler, enums.CapManageSpecies))

	//// ADMIN
	// Pages
	mux.Handle("GET /gdrive", loggedInf(server.getGDriveHandler, enums.CapViewGDriveSettings))
	mux.Handle("GET /user/{user}/confirm-scrub", loggedInf(server.userConfirmScrubHandler, enums.CapDeleteUsers))
	mux.Handle("GET /user/{user}/confirm-nuke", loggedInf(server.userConfirmNukeHandler, enums.CapDeleteUsers))
	mux.Handle("GET /debug", loggedIn(&handlerdebug.Page{ConstantInfo: server.ConstantDebugInfo}, enums.CapDebug))
	// Forms
	mux.Handle("POST /user/{user}/scrub", loggedInf(server.userDoScrubHandler, enums.CapDeleteUsers))
	mux.Handle("POST /user/{user}/nuke", loggedInf(server.userDoNukeHandler, enums.CapDeleteUsers))
	mux.Handle("POST /gdrive/invite/{email}", loggedInf(server.gdriveInviteUserHandler, enums.CapInviteToGDrive))
	mux.Handle("POST /invite", loggedInf(server.inviteHandler, enums.CapInviteToBino))
	mux.Handle("POST /invite/{email}", loggedInf(server.inviteHandler, enums.CapInviteToBino))
	mux.Handle("POST /invite/{id}/delete", loggedInf(server.inviteDeleteHandler, enums.CapInviteToBino))

	//// FALLBACK
	// Pages
	mux.Handle("GET /", chainf(func(w W, r *R) {
		handlererror.NotFound(w, r, fmt.Errorf("not found: %s %s", r.Method, r.RequestURI))
	}, publicFlow...))
	mux.Handle("POST /", chainf(func(w W, r *R) {
		handlererror.NotFound(w, r, fmt.Errorf("not found: %s %s", r.Method, r.RequestURI))
	}, publicFlow...))

	go func() {
		handler := chain(mux, withRecover)
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
