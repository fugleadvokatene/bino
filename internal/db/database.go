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
	MainRoot *os.Root
	TmpRoot  *os.Root

	// Only used for commit operation which renames from tmp to main
	mainDirectory string
	tmpDirectory  string
}

func New(conn *pgxpool.Pool, mainDir, tmpDir string) (*Database, error) {
	if err := os.MkdirAll(mainDir, os.ModePerm); err != nil {
		return nil, fmt.Errorf("creating mainDir='%s': %w", mainDir, err)
	}
	if err := os.MkdirAll(tmpDir, os.ModePerm); err != nil {
		return nil, fmt.Errorf("creating tmpDir='%s': %w", tmpDir, err)
	}
	MainRoot, err := os.OpenRoot(mainDir)
	if err != nil {
		return nil, fmt.Errorf("opening main root: %w", err)
	}
	TmpRoot, err := os.OpenRoot(tmpDir)
	if err != nil {
		MainRoot.Close()
		return nil, fmt.Errorf("opening tmp root: %w", err)
	}

	return &Database{
		Conn: conn,
		Q:    sql.New(conn),

		MainRoot: MainRoot,
		TmpRoot:  TmpRoot,

		mainDirectory: mainDir,
		tmpDirectory:  tmpDir,
	}, nil
}

func (db *Database) Close() error {
	db.Conn.Close()
	return errors.Join(
		db.MainRoot.Close(),
		db.TmpRoot.Close(),
	)
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
