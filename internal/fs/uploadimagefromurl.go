package fs

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/http"
	"path"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/model"
)

func UploadImageFromURL(ctx context.Context, url string, backend FileStorage, creatorID int32) UploadResult {
	resp, err := http.Get(url)
	if err != nil {
		return UploadResult{Error: err}
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return UploadResult{Error: fmt.Errorf("server response: %d", resp.StatusCode)}
	}

	imgBin, err := io.ReadAll(resp.Body)
	if err != nil {
		return UploadResult{Error: err}
	}

	ct := resp.Header.Get("Content-Type")
	if ct == "" {
		return UploadResult{Error: fmt.Errorf("missing content type")}
	}
	if !strings.HasPrefix(ct, "image/") {
		return UploadResult{Error: fmt.Errorf("not an image: %s", ct)}
	}

	name := path.Base(resp.Request.URL.Path)
	if name == "" || name == "/" {
		name = "file"
	}

	info := model.FileInfo{
		FileName: name,
		MIMEType: ct,
		Size:     int64(len(imgBin)),
		Created:  time.Now(),
		Creator:  creatorID,
	}

	r := bytes.NewReader(imgBin)
	result := backend.Upload(ctx, r, info)
	return result
}
