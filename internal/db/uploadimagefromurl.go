package db

import (
	"context"
	"fmt"
	"net/url"
	"path"
	"strings"

	"github.com/fugleadvokatene/bino/internal/security"
)

func UploadImageFromURL(ctx context.Context, rawURL string, db *Database) (string, int32, error) {
	r, fetchInfo, err := security.Fetch(ctx, rawURL, func(ct string) error {
		if !strings.HasPrefix(ct, "image/") {
			return fmt.Errorf("not an image: %s", ct)
		}
		return nil
	})
	if err != nil {
		return "", 0, err
	}
	name := "file.img"
	if u, err := url.Parse(rawURL); err == nil {
		nameFromURL := security.SanitizeFilename(path.Base(u.Path), fetchInfo.ContentType)
		if nameFromURL != "" && nameFromURL != "/" {
			name = nameFromURL
		}
	}

	uuid, err := db.UploadFile(ctx, r, name, fetchInfo.ContentType, fetchInfo.ContentLength)
	if err != nil {
		return "", 0, err
	}

	return db.CommitFile(ctx, uuid)
}
