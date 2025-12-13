package handlerwiki

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"path"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type FetchImage struct {
	DB          *db.Database
	FileBackend fs.FileStorage
}

type WikiFetchImageRequest struct {
	URL                   string         `json:"url"`
	AdditionalRequestData map[string]any `json:"additionalRequestData"`
}

type WikiImageResponse struct {
	Success int `json:"success"`
	File    struct {
		URL string `json:"url"`
	} `json:"file"`
}

func (h *FetchImage) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var resp WikiImageResponse
	defer func() {
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			request.LogError(r, fmt.Errorf("encoding output response: %w", err))
		}
	}()

	wikiID, err := request.GetPathID(r, "id")
	if err != nil {
		request.LogError(r, fmt.Errorf("getting ID from path: %w", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	bytes, err := io.ReadAll(r.Body)
	if err != nil {
		request.LogError(r, fmt.Errorf("reading request body: %w", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var req WikiFetchImageRequest
	if err := json.Unmarshal(bytes, &req); err != nil {
		request.LogError(r, fmt.Errorf("unmarshalling request body: %w", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var fileID int32
	if fileID, err = request.ParseFileURLFromSameSite(r, req.URL); err == nil {
		if file, err := h.DB.Q.GetFileByID(ctx, fileID); err == nil {
			resp.Success = 1
			resp.File.URL = model.FileURL(fileID, file.PresentationFilename)
		} else {
			request.LogError(r, fmt.Errorf("no such file ID '%d': %w", fileID, err))
		}
	}

	if resp.Success == 0 {
		uploadResult := uploadImageFromURL(ctx, req.URL, h.FileBackend)
		if uploadResult.Error != nil {
			request.LogError(r, fmt.Errorf("uploading image: %w", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		commitResult := h.FileBackend.Commit(ctx, []string{uploadResult.UniqueID})
		if commitResult.Error != nil {
			request.LogError(r, fmt.Errorf("committing image: %w", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		fileInfo := commitResult.Commited[uploadResult.UniqueID]
		fileID, err = h.DB.Q.RegisterFile(ctx, sql.RegisterFileParams{
			Uuid:          uploadResult.UniqueID,
			Creator:       request.MustLoadCommonData(ctx).User.AppuserID,
			Created:       pgtype.Timestamptz{Time: time.Now(), Valid: true},
			Accessibility: int32(model.FileAccessibilityInternal),
			Filename:      fileInfo.FileName,
			Mimetype:      fileInfo.MIMEType,
			Size:          fileInfo.Size,
		})
		if err != nil {
			request.LogError(r, fmt.Errorf("registering file to db: %w", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		} else {
			resp.Success = 1
			resp.File.URL = model.FileURL(fileID, fileInfo.FileName)
		}
	}

	if err := h.DB.Q.AssociateFileWithWikiPage(ctx, sql.AssociateFileWithWikiPageParams{
		FileID: fileID,
		WikiID: wikiID,
	}); err != nil {
		request.LogError(r, fmt.Errorf("associating file %d with wiki page %d: %w", fileID, wikiID, err))
	}

	w.WriteHeader(http.StatusOK)
}

func uploadImageFromURL(ctx context.Context, url string, backend fs.FileStorage) fs.UploadResult {
	data := request.MustLoadCommonData(ctx)

	resp, err := http.Get(url)
	if err != nil {
		return fs.UploadResult{Error: err}
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fs.UploadResult{Error: fmt.Errorf("server response: %w", resp.StatusCode)}
	}

	imgBin, err := io.ReadAll(resp.Body)
	if err != nil {
		return fs.UploadResult{Error: err}
	}

	ct := resp.Header.Get("Content-Type")
	if ct == "" {
		return fs.UploadResult{Error: fmt.Errorf("missing content type")}
	}
	if !strings.HasPrefix(ct, "image/") {
		return fs.UploadResult{Error: fmt.Errorf("not an image: %s", ct)}
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
		Creator:  data.User.AppuserID,
	}

	r := bytes.NewReader(imgBin)
	result := backend.Upload(ctx, r, info)
	return result
}
