package sql

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/stdlib"
	migrate "github.com/rubenv/sql-migrate"
)

func Setup(ctx context.Context, c *Credentials) (*pgxpool.Pool, error) {
	conn, err := pgxpool.New(ctx, c.URL())
	if err != nil {
		return nil, err
	}

	migrations := migrate.EmbedFileSystemMigrationSource{
		FileSystem: DBMigrations,
		Root:       "migrations",
	}

	sqlDB := stdlib.OpenDBFromPool(conn)
	defer sqlDB.Close()

	if err := sqlDB.PingContext(ctx); err != nil {
		return nil, fmt.Errorf("pinging db: %w", err)
	}

	var n int
	for {
		var err error
		n, err = migrate.ExecContext(ctx, sqlDB, "postgres", migrations, migrate.Up)
		if err != nil {
			if strings.Contains(err.Error(), "SQLSTATE 57P03") {
				fmt.Printf("db is starting up...\n")
				time.Sleep(time.Second)
			} else {
				return nil, fmt.Errorf("migrating: %w", err)
			}
		} else {
			break
		}
	}
	fmt.Printf("Did %d migrations\n", n)

	return conn, nil
}
