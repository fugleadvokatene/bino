package main

import (
	"context"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/db"
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

	conn, err := dbSetup(ctx)
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	queries := db.New(conn)

	gdriveSA, err := NewGDriveWithServiceAccount(ctx, config.GoogleDrive, queries)
	if err != nil {
		panic(err)
	}
	worker := NewGDriveWorker(ctx, config.GoogleDrive, gdriveSA)

	fileBackend := NewLocalFileStorage(ctx, "file", "tmp")

	go background(ctx, queries, fileBackend, config.SystemLanguage)

	err = startServer(
		ctx,
		conn,
		queries,
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
