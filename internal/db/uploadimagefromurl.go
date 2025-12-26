package db

import (
	"context"
	"fmt"
	"net/url"
	"path"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/security"
)

func UploadImageFromURL(ctx context.Context, rawURL string, db *Database) (model.FileInfo, int32, error) {
	r, fetchInfo, err := security.Fetch(ctx, rawURL, func(ct string) error {
		if !strings.HasPrefix(ct, "image/") {
			return fmt.Errorf("not an image: %s", ct)
		}
		return nil
	})
	if err != nil {
		return model.FileInfo{}, 0, err
	}
	name := "file.img"
	if u, err := url.Parse(rawURL); err == nil {
		nameFromURL := security.SanitizeFilename(path.Base(u.Path), fetchInfo.ContentType)
		if nameFromURL != "" && nameFromURL != "/" {
			name = nameFromURL
		}
	}

	info := model.FileInfo{
		FileName: name,
		MIMEType: fetchInfo.ContentType,
		Size:     fetchInfo.ContentLength,
		Created:  time.Now(),
	}

	uuid, err := db.UploadFile(ctx, r, info)
	if err != nil {
		return model.FileInfo{}, 0, err
	}

	return db.CommitFile(ctx, uuid)
}
