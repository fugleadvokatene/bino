package handlerwiki

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type uploadImage struct {
	DB          *db.Database
	FileBackend fs.FileStorage
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
	if err := r.ParseMultipartForm(fs.MaxImageSize); err != nil {
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

	uploadResult := h.FileBackend.Upload(ctx, file, model.FileInfo{
		FileName: header.Filename,
		MIMEType: header.Header.Get("Content-Type"),
		Size:     header.Size,
		Creator:  data.User.AppuserID,
		Created:  time.Now(),
	})
	if uploadResult.Error != nil {
		request.LogError(r, fmt.Errorf("uploading file file: %w", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	commitResult := h.FileBackend.Commit(ctx, []string{uploadResult.UniqueID})
	if commitResult.Error != nil {
		request.LogError(r, fmt.Errorf("committing image: %w", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	fileInfo := commitResult.Commited[uploadResult.UniqueID]
	fileID, err := h.DB.Q.RegisterFile(ctx, sql.RegisterFileParams{
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

	if err := h.DB.Q.AssociateFileWithWikiPage(ctx, sql.AssociateFileWithWikiPageParams{
		FileID: fileID,
		WikiID: wikiID,
	}); err != nil {
		request.LogError(r, fmt.Errorf("associating file %d with wiki page %d: %w", fileID, wikiID, err))
	}

	w.WriteHeader(http.StatusOK)
}
