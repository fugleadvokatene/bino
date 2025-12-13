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
	"github.com/fugleadvokatene/bino/internal/model"
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

	// Abbreviations
	type W = http.ResponseWriter
	type R = http.Request
	m := func(path string, handler http.Handler, cap model.Cap) {
		requirements := slices.Clone(baseFlow)
		requirements = append(requirements, server.requireCapability(cap))
		mux.Handle(path, Chain(handler, requirements...))
	}

	// Main page
	mux.Handle("GET /{$}", Chain(&handlermain.Handler{Dashboard: &handlerdashboard.Page{DB: db}}, publicFlow...))

	// Login flow
	mux.Handle("GET /login", Chainf(server.loginHandler))
	mux.Handle("POST /login", Chainf(server.loginHandler))
	mux.Handle("GET /AuthLogOut", Chainf(server.AuthLogOutHandler))
	mux.Handle("POST /AuthLogOut", Chainf(server.AuthLogOutHandler))
	mux.Handle("GET /oauth2/callback", Chainf(server.callbackHandler))
	mux.Handle("POST /oauth2/callback", Chainf(server.callbackHandler))

	// Dashbord
	m("POST /checkin", &handlerdashboard.Checkin{DB: db, GDriveWorker: server.GDriveWorker, Config: &server.Config}, model.CapCheckInPatient)

	// Privacy policy
	mux.Handle("GET /privacy", Chain(&handlerprivacy.Page{Config: server.Config.Privacy}, publicFlow...))
	m("POST /privacy", &handlerprivacy.Form{DB: db, Config: server.Config.Privacy}, model.CapSetOwnPreferences)
	mux.Handle("GET /tos", Chainf(handlertos.Handler, publicFlow...))
	mux.Handle("GET /access", Chainf(handleraccess.Handler, baseFlow...))

	// Static content
	staticDir := fmt.Sprintf("/static/%s/", buildKey)
	mux.Handle("GET "+staticDir, http.StripPrefix(staticDir, http.FileServer(http.Dir(config.HTTP.StaticDir))))

	// Files
	mux.Handle("GET /file/{id}/{filename}", Chain(&handlerfile.Read{DB: db, FileBackend: fileBackend}, baseFlow...))
	m("GET /file", &handlerfile.UploadPage{DB: db}, model.CapUploadFile)
	m("POST /file/filepond", &handlerfile.FilepondProcess{FileBackend: fileBackend}, model.CapUploadFile)
	m("DELETE /file/filepond", &handlerfile.FilepondRevert{FileBackend: fileBackend}, model.CapUploadFile)
	m("GET /file/filepond/{id}", &handlerfile.FilepondRestore{FileBackend: fileBackend}, model.CapUploadFile)
	m("POST /file/submit", &handlerfile.FilepondSubmit{DB: db, FileBackend: fileBackend}, model.CapUploadFile)
	m("POST /file/{id}/delete", &handlerfile.Delete{DB: db, FileBackend: fileBackend}, model.CapUploadFile)
	m("POST /file/{id}/set-filename", &handlerfile.SetFilename{DB: db}, model.CapEditWiki)

	// Patients
	m("GET /patient/{patient}", &handlerpatient.Page{DB: db}, model.CapViewAllActivePatients)
	m("POST /patient/{patient}/move", &handlerpatient.Move{DB: db}, model.CapManageOwnPatients)
	m("POST /patient/{patient}/checkout", &handlerpatient.Checkout{DB: db}, model.CapManageOwnPatients)
	m("POST /patient/{patient}/set-name", &handlerpatient.SetName{DB: db}, model.CapManageOwnPatients)
	m("POST /patient/{patient}/create-journal", &handlerpatient.CreateJournal{DB: db, GDriveWorker: server.GDriveWorker, Config: &server.Config}, model.CapCreatePatientJournal)
	m("POST /patient/{patient}/attach-journal", &handlerpatient.AttachJournal{DB: db}, model.CapManageOwnPatients)
	m("POST /patient/{patient}/accept-suggested-journal", &handlerpatient.AcceptSuggestedJournal{DB: db}, model.CapManageOwnPatients)
	m("POST /patient/{patient}/decline-suggested-journal", &handlerpatient.DeclineSuggestedJournal{DB: db}, model.CapManageOwnPatients)

	// Home
	m("GET /home/{home}", &handlerhome.Page{DB: db}, model.CapViewAllHomes)
	m("POST /home/{home}/set-capacity", &handlerhome.SetCapacity{DB: db}, model.CapManageOwnHomes)
	m("POST /home/{home}/add-unavailable", &handlerhome.AddHomeUnavailablePeriod{DB: db}, model.CapManageOwnHomes)
	m("POST /home/{home}/set-note", &handlerhome.SetNote{DB: db}, model.CapManageOwnHomes)
	m("POST /home/{home}/species/add", &handlerhome.AddPreferredSpecies{DB: db}, model.CapManageOwnHomes)
	m("POST /home/{home}/species/delete/{species}", &handlerhome.DeletePreferredSpecies{DB: db}, model.CapManageOwnHomes)
	m("POST /home/{home}/species/reorder", &handlerhome.ReorderSpecies{DB: db}, model.CapManageOwnHomes)
	m("POST /period/{period}/delete", &handlerhome.DeleteHomeUnavailablePeriod{DB: db}, model.CapManageOwnHomes)
	m("POST /ajaxreorder", &handlerhome.AjaxReorderHandler{DB: db}, model.CapManageOwnPatients)

	// User
	m("GET /user/{user}", &handleruser.GetUser{DB: db}, model.CapViewAllHomes)

	// Former patients
	m("GET /former-patients", &handlerformerpatients.Page{DB: db}, model.CapViewAllFormerPatients)

	// Calendar
	m("GET /calendar", &handlercalendar.Page{}, model.CapViewCalendar)
	m("GET /calendar/away", &handlercalendar.AjaxAway{DB: db}, model.CapViewCalendar)
	m("GET /calendar/patientevents", &handlercalendar.AjaxPatientEvents{DB: db}, model.CapViewCalendar)

	// Import tool
	m("GET /import", &handlerimport.Page{}, model.CapUseImportTool)
	m("POST /import", &handlerimport.Post{}, model.CapUseImportTool)
	m("GET /import/validation", &handlerimport.Validate{DB: db}, model.CapUseImportTool)

	// Search
	m("GET /search", &handlersearch.Page{DB: db}, model.CapSearch)
	m("GET /search/live", &handlersearch.Live{DB: db}, model.CapSearch)

	// Wiki
	m("GET /wiki", &handlerwiki.Main{DB: db}, model.CapEditWiki)
	m("GET /wiki/view/{id}", &handlerwiki.Page{DB: db}, model.CapEditWiki)
	m("POST /wiki/create", &handlerwiki.Create{DB: db}, model.CapEditWiki)
	m("POST /wiki/title/{id}", &handlerwiki.SetTitle{DB: db}, model.CapEditWiki)
	m("POST /wiki/save/{id}", &handlerwiki.Save{DB: db}, model.CapEditWiki)
	m("POST /wiki/fetchimage/{id}", &handlerwiki.FetchImage{DB: db, FileBackend: fileBackend}, model.CapEditWiki)
	m("POST /wiki/uploadimage/{id}", &handlerwiki.UploadImage{DB: db, FileBackend: fileBackend}, model.CapEditWiki)

	// Events
	m("POST /event/{event}/set-note", &handlerevent.SetNote{DB: db}, model.CapManageOwnPatients)

	// Language
	m("POST /language", &handlerlanguage.Post{DB: db}, model.CapSetOwnPreferences)

	// Admin root
	m("GET /admin", &handleradminroot.Handler{}, model.CapViewAdminTools)

	// Species admin
	m("GET /species", &handlerspeciesadmin.GetSpecies{DB: db}, model.CapManageSpecies)
	m("POST /species", &handlerspeciesadmin.PostSpecies{DB: db}, model.CapManageSpecies)
	m("PUT /species", &handlerspeciesadmin.PutSpecies{DB: db}, model.CapManageSpecies)

	// Home admin
	m("GET /homes", &handlerhomeadmin.Page{DB: db}, model.CapManageAllHomes)
	m("POST /homes", &handlerhomeadmin.Form{DB: db}, model.CapManageAllHomes)
	m("POST /homes/{home}/set-name", &handlerhomeadmin.Form{DB: db}, model.CapManageOwnHomes)

	// User admin
	m("GET /users", &handleruseradmin.Page{DB: db}, model.CapManageUsers)
	m("GET /user/{user}/confirm-scrub", &handleruseradmin.ConfirmScrubOrNuke{DB: db, Nuke: false}, model.CapDeleteUsers)
	m("GET /user/{user}/confirm-nuke", &handleruseradmin.ConfirmScrubOrNuke{DB: db, Nuke: true}, model.CapDeleteUsers)
	m("POST /user/{user}/scrub", &handleruseradmin.DoScrubOrNuke{DB: db, Nuke: false}, model.CapDeleteUsers)
	m("POST /user/{user}/nuke", &handleruseradmin.DoScrubOrNuke{DB: db, Nuke: true}, model.CapDeleteUsers)
	m("POST /invite", &handleruseradmin.Invite{DB: db}, model.CapInviteToBino)
	m("POST /invite/{email}", &handleruseradmin.Invite{DB: db}, model.CapInviteToBino)
	m("POST /invite/{id}/delete", &handleruseradmin.InviteDelete{DB: db}, model.CapInviteToBino)

	// GDrive admin
	m("GET /gdrive", &handlergdriveadmin.Page{Worker: server.GDriveWorker, DB: db}, model.CapViewGDriveSettings)
	m("POST /gdrive/invite/{email}", &handlergdriveadmin.Invite{Worker: server.GDriveWorker}, model.CapInviteToGDrive)

	// Debug
	m("GET /debug", &handlerdebug.Page{ConstantInfo: server.ConstantDebugInfo}, model.CapDebug)

	// 404
	mux.Handle("GET /", Chainf(func(w W, r *R) {
		handlererror.NotFound(w, r, fmt.Errorf("not found: %s %s", r.Method, r.RequestURI))
	}, publicFlow...))
	mux.Handle("POST /", Chainf(func(w W, r *R) {
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
