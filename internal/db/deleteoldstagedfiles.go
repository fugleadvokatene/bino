package db

import (
	"context"
	"log/slog"
	"time"
)

func DeleteOldStagedFiles(ctx context.Context, db *Database, maxAge time.Duration) (int, error) {
	tempFiles, err := db.ListTempFileDirectory(ctx)
	if err != nil {
		return 0, err
	}

	n := 0
	for uuid, info := range tempFiles {
		if time.Since(info.Created) > maxAge {
			if result := db.DeleteTempFile(ctx, uuid); result == nil {
				n += 1
			} else {
				slog.ErrorContext(ctx, "couldn't delete temp file", "uuid", uuid, "error", result)
			}
		}
	}

	return n, nil
}
