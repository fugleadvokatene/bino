package main

import (
	"context"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/background"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/joho/godotenv"
)

func main() {
	if BuildKey == "" {
		panic("missing build key")
	}

	ctx := context.Background()
	fmt.Println("Starting...")

	godotenv.Load(".env")

	config, err := loadConfig("config.json")
	if err != nil {
		panic(err)
	}

	conn, err := sql.Setup(ctx)
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	db := &db.Database{Q: sql.New(conn)}

	gdriveSA, err := NewGDriveWithServiceAccount(ctx, config.GoogleDrive, db)
	if err != nil {
		panic(err)
	}
	worker := NewGDriveWorker(ctx, config.GoogleDrive, gdriveSA)

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
