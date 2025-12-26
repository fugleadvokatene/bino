package db

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Database struct {
	// Postgres
	Q    *sql.Queries
	Conn *pgxpool.Pool

	// Local file system
	MainDirectory string
	TmpDirectory  string
}

func New(conn *pgxpool.Pool, mainDir, tmpDir string) *Database {
	if err := os.MkdirAll(mainDir, os.ModePerm); err != nil {
		panic(fmt.Errorf("creating mainDir='%s': %w", mainDir, err))
	}
	if err := os.MkdirAll(tmpDir, os.ModePerm); err != nil {
		panic(fmt.Errorf("creating tmpDir='%s': %w", tmpDir, err))
	}

	return &Database{
		Conn: conn,
		Q:    sql.New(conn),

		MainDirectory: mainDir,
		TmpDirectory:  tmpDir,
	}
}

func (db *Database) Transaction(ctx context.Context, f func(ctx context.Context, q *Database) error) error {
	tx, err := db.Conn.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return fmt.Errorf("starting database transaction: %w", err)
	}
	err = f(ctx, &Database{
		Q:    db.Q.WithTx(tx),
		Conn: db.Conn,
	})
	if err == nil {
		err = tx.Commit(ctx)
	} else {
		err = errors.Join(err, tx.Rollback(ctx))
	}
	return err
}
