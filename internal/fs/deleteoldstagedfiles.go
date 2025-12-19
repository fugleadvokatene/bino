package fs

import (
	"context"
	"log"
	"time"
)

func DeleteOldStagedFiles(ctx context.Context, fileBackend *LocalFileStorage, maxAge time.Duration) (int, error) {
	tempFiles := fileBackend.ListTemp(ctx)
	if tempFiles.Error != nil {
		return 0, tempFiles.Error
	}

	n := 0
	for uuid, info := range tempFiles.Files {
		if time.Since(info.Created) > maxAge {
			if result := fileBackend.DeleteTemp(ctx, uuid); result.Error == nil {
				n += 1
			} else {
				log.Printf("couldn't delete temp file %s: %v", uuid, result.Error)
			}
		}
	}

	return n, nil
}
