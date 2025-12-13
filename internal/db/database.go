package db

import (
	"context"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Database struct {
	Q    *sql.Queries
	Conn *pgxpool.Pool
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
		tx.Rollback(ctx)
	}
	return err
}
