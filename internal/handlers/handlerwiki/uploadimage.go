package handlerwiki

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type uploadImage struct {
	DB *db.Database
}

func (h *uploadImage) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

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

	// Parse multipart form with reasonable max memory
	if err := r.ParseMultipartForm(db.MaxImageSize); err != nil {
		request.LogError(r, fmt.Errorf("reading request body: %w", err))
		w.WriteHeader(http.StatusRequestEntityTooLarge)
		return
	}

	file, header, err := r.FormFile("image")
	if err != nil {
		request.LogError(r, fmt.Errorf("getting form file: %w", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	defer file.Close()

	uuid, err := h.DB.UploadFile(ctx, file, model.FileInfo{
		FileName: header.Filename,
		MIMEType: header.Header.Get("Content-Type"),
		Size:     header.Size,
		Creator:  data.User.AppuserID,
		Created:  time.Now(),
	})
	if err != nil {
		request.LogError(r, fmt.Errorf("uploading file: %w", err))
		w.WriteHeader(db.GetHTTPStatusCode(err))
		return
	}

	fileInfo, fileID, err := h.DB.CommitFile(ctx, uuid)
	if err != nil {
		request.LogError(r, fmt.Errorf("registering file to db: %w", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	} else {
		resp.Success = 1
		resp.File.URL = model.FileURL(fileID, fileInfo.FileName)
	}

	if err := h.DB.Q.AssociateFileWithWikiPage(ctx, sql.AssociateFileWithWikiPageParams{
		FileID: fileID,
		WikiID: wikiID,
	}); err != nil {
		request.LogError(r, fmt.Errorf("associating file %d with wiki page %d: %w", fileID, wikiID, err))
	}

	w.WriteHeader(http.StatusOK)
}
