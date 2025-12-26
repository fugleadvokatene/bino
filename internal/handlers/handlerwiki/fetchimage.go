package handlerwiki

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type fetchImage struct {
	DB *db.Database
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

func (h *fetchImage) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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
		filename, fileID, err := db.UploadImageFromURL(ctx, req.URL, h.DB)
		if err != nil {
			request.LogError(r, fmt.Errorf("uploadign image db: %w", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		} else {
			resp.Success = 1
			resp.File.URL = model.FileURL(fileID, filename)
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
