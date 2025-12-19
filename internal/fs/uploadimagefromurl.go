package fs

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

func UploadImageFromURL(ctx context.Context, rawURL string, backend *LocalFileStorage, creatorID int32) UploadResult {
	r, fetchInfo, err := security.Fetch(ctx, rawURL, func(ct string) error {
		if !strings.HasPrefix(ct, "image/") {
			return fmt.Errorf("not an image: %s", ct)
		}
		return nil
	})
	if err != nil {
		return UploadResult{Error: err}
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
		Creator:  creatorID,
	}

	result := backend.Upload(ctx, r, info)
	return result
}
