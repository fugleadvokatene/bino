package db

import (
	"context"
	"log/slog"
	"time"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

func (db *Database) SysLog(ctx context.Context, message string, severity model.Severity, t time.Time) {
	slog.Log(ctx, severity.ToSlogLevel(), message)
	_ = db.Q.SysLogInsert(ctx, sql.SysLogInsertParams{
		Message:  message,
		Severity: int32(severity),
		Time:     pgtype.Timestamptz{Time: t, Valid: true},
	})
}

func (db *Database) SysLogGet(ctx context.Context, limit int32, offset int32) ([]model.SysLogEntry, error) {
	rows, err := db.Q.SysLogGet(ctx, sql.SysLogGetParams{
		Offs: offset,
		Lim:  limit,
	})
	if err != nil {
		return nil, err
	}
	return model.SliceToModel(rows), nil
}

func (db *Database) SysLogDrop(ctx context.Context, threshold time.Duration) (int64, error) {
	return db.Q.SysLogDrop(ctx, threshold)
}
