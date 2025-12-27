package main

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/fugleadvokatene/bino/internal/auth"
	"github.com/fugleadvokatene/bino/internal/background"
	"github.com/fugleadvokatene/bino/internal/config"
	dblib "github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/handlers/handleraccess"
	"github.com/fugleadvokatene/bino/internal/handlers/handleradminroot"
	"github.com/fugleadvokatene/bino/internal/handlers/handlercalendar"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerdashboard"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerdebug"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerevent"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerfeatureflag"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerfile"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerformerpatients"
	"github.com/fugleadvokatene/bino/internal/handlers/handlergdriveadmin"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerhome"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerhomeadmin"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerlanguage"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerlive"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerlogging"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerlogin"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerpatient"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerprivacy"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerrecover"
	"github.com/fugleadvokatene/bino/internal/handlers/handlersearch"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerspeciesadmin"
	"github.com/fugleadvokatene/bino/internal/handlers/handlertos"
	"github.com/fugleadvokatene/bino/internal/handlers/handleruser"
	"github.com/fugleadvokatene/bino/internal/handlers/handleruseradmin"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerwiki"
	"github.com/fugleadvokatene/bino/internal/route"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/sse"
	"github.com/joho/godotenv"
	"github.com/lmittmann/tint"
	"github.com/mattn/go-isatty"
)

var BuildKey string

func main() {
	err := realMain()

	panic(fmt.Errorf("exited with %w", err))
}

func realMain() error {
	// Set up logging
	slog.SetDefault(slog.New(
		tint.NewHandler(os.Stdout, &tint.Options{
			Level:      slog.LevelDebug,
			TimeFormat: time.Kitchen,
			NoColor:    !isatty.IsTerminal(os.Stdout.Fd()),
		}),
	))
	slog.Info("Hello, Bino.")

	// Ensure build key has been provided
	if BuildKey == "" {
		return errors.New("missing build key")
	}

	// Load environment file
	if err := godotenv.Load(".env"); err != nil {
		return fmt.Errorf("loading env: %w", err)
	}

	// Load config
	config, err := config.Load("config.json")
	if err != nil {
		return fmt.Errorf("loading config: %w", err)
	}

	// Set up root context
	ctx := context.Background()

	// Connect to database
	credentials, err := sql.NewCredentialsFromEnv()
	if err != nil {
		return fmt.Errorf("constructing database credentials: %w", err)
	}
	conn, err := sql.Setup(ctx, credentials)
	if err != nil {
		return fmt.Errorf("setting up database connection: %w", err)
	}
	db, err := dblib.New(conn, "file", "tmp")
	if err != nil {
		conn.Close()
		return fmt.Errorf("creating dblib: %w", err)
	}
	defer db.Close()

	// Set up broker
	broker := sse.NewBroker(ctx)

	// Start all background jobs
	jobs := background.StartJobs(ctx, db, config.SystemLanguage, &config.Security)

	// Set up Google Drive client
	gdriveClient, err := gdrive.NewClient(ctx, config.GoogleDrive, db)
	if err != nil {
		return fmt.Errorf("setting up google drive client: %w", err)
	}
	gdriveWorker := gdrive.NewWorker(ctx, config.GoogleDrive, gdriveClient, &jobs)

	// Set up authentication
	authenticator, err := auth.New(ctx, config.Auth, db)
	if err != nil {
		return fmt.Errorf("setting up authentication: %w", err)
	}
	mux := authenticator.NewServeMux()

	// Set up static asset handler
	staticDir := fmt.Sprintf("/static/%s/", BuildKey)
	mux.Handle("GET "+staticDir, http.StripPrefix(staticDir, http.FileServer(http.Dir(config.HTTP.StaticDir))))

	// Set up dynamic handlers
	for _, routes := range [][]route.Route{
		[]route.Route{
			{
				Path:             "GET /{$}",
				Handler:          &handlerdashboard.Page{DB: db, MascotURL: config.MascotURL},
				LoggedOutHandler: handlerlogin.New(config.Organization, config.MascotURL),
			},
		},
		handleraccess.Routes(),
		handleradminroot.Routes(),
		handlercalendar.Routes(db),
		handlerdashboard.Routes(ctx, db, gdriveWorker, broker, config),
		handlerdebug.Routes(db),
		handlerevent.Routes(db),
		handlerfeatureflag.Routes(db),
		handlerfile.Routes(db, &jobs),
		handlerformerpatients.Routes(db),
		handlergdriveadmin.Routes(db, gdriveWorker),
		handlerhome.Routes(db),
		handlerhomeadmin.Routes(db),
		handlerlanguage.Routes(db),
		handlerpatient.Routes(db, gdriveWorker, config),
		handlerprivacy.Routes(db, config.Privacy),
		handlersearch.Routes(db),
		handlerspeciesadmin.Routes(db),
		handlertos.Routes(),
		handleruser.Routes(db),
		handlerlive.Routes(broker),
		handleruseradmin.Routes(db),
		handlerwiki.Routes(db, &config.Security),
	} {
		for _, route := range routes {
			handler := route.Handler
			if route.LoggedOutHandler != nil {
				handler = auth.NewLoginOptionalHandler(
					handler,
					authenticator,
					route.LoggedOutHandler,
					BuildKey,
				)
			} else {
				handler = handleraccess.New(handler, route.Cap)
				handler = handlerlogging.New(handler)
				handler = auth.NewLoginRequiredHandler(
					handler,
					authenticator,
					BuildKey,
				)
			}
			mux.Handle(route.Path, handler)
		}
	}

	// Set up 404 handlers
	mux.Handle("GET /", auth.NewLoginOptionalHandler(http.HandlerFunc(handlererror.PathNotFound), authenticator, nil, BuildKey))
	mux.Handle("POST /", auth.NewLoginOptionalHandler(http.HandlerFunc(handlererror.PathNotFound), authenticator, nil, BuildKey))

	// Start server server
	srv := &http.Server{
		Addr:              config.HTTP.URL,
		Handler:           handlerrecover.New(mux),
		ReadTimeout:       config.HTTP.ReadTimeoutSeconds * time.Second,
		ReadHeaderTimeout: config.HTTP.ReadHeaderTimeoutSeconds * time.Second,
		WriteTimeout:      config.HTTP.WriteTimeoutSeconds * time.Second,
		IdleTimeout:       config.HTTP.IdleTimeoutSeconds * time.Second,
	}

	slog.Info("All setup completed, starting server", "Addr", config.HTTP.URL)
	return srv.ListenAndServe()
}
