package main

import (
	"context"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/background"
	"github.com/fugleadvokatene/bino/internal/config"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/joho/godotenv"
)

var BuildKey string

func main() {
	if BuildKey == "" {
		panic("missing build key")
	}

	ctx := context.Background()
	fmt.Println("Starting...")

	godotenv.Load(".env")

	config, err := config.Load("config.json")
	if err != nil {
		panic(err)
	}

	conn, err := sql.Setup(ctx)
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	db := &db.Database{
		Conn: conn,
		Q:    sql.New(conn),
	}

	gdriveClient, err := gdrive.NewClient(ctx, config.GoogleDrive, db)
	if err != nil {
		panic(err)
	}
	worker := gdrive.NewWorker(ctx, config.GoogleDrive, gdriveClient)

	fileBackend := fs.NewLocalFileStorage(ctx, "file", "tmp")

	background.StartJobs(ctx, db, fileBackend, config.SystemLanguage)

	err = startServer(
		ctx,
		conn,
		db,
		worker,
		fileBackend,
		config,
		BuildKey,
	)
	if err != nil {
		panic(err)
	}

	fmt.Println("Ready")
	select {}
}
