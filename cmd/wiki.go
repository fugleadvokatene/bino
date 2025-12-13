package main

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

	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/view"
	"github.com/jackc/pgx/v5/pgtype"
)

func (server *Server) wikiMain(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	pages, err := server.DB.Q.GetWikiPages(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	mainPage, err := server.DB.Q.GetWikiMainPage(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	data.Subtitle = mainPage.Title

	_ = WikiPageTempl(
		data,
		mainPage.ToWikiPageView(),
		generic.SliceToSlice(pages, func(in sql.WikiPage) view.WikiLink {
			return in.ToWikiLinkView()
		}),
	).Render(ctx, w)
}

func (server *Server) wikiPage(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "id")
	if err != nil {
		handlererror.NotFound(w, r, err)
		return
	}

	pages, err := server.DB.Q.GetWikiPages(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	page, err := server.DB.Q.GetLastWikiRevision(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	data.Subtitle = page.Title

	_ = WikiPageTempl(
		data,
		page.ToWikiPageView(),
		generic.SliceToSlice(pages, func(in sql.WikiPage) view.WikiLink {
			return in.ToWikiLinkView()
		}),
	).Render(ctx, w)
}

func (server *Server) wikiSave(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "id")
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}

	bytes, err := io.ReadAll(r.Body)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}

	if _, err := server.DB.Q.SaveWikiPage(ctx, sql.SaveWikiPageParams{
		PageID:  id,
		Content: bytes,
		Editor:  data.User.AppuserID,
	}); err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (server *Server) wikiSetTitle(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathID(r, "id")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	title, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := server.DB.Q.SetWikiPageTitle(ctx, sql.SetWikiPageTitleParams{
		ID:    id,
		Title: title,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.Redirect(w, r, fmt.Sprintf("/wiki/view/%d", id))
}

func (server *Server) wikiCreate(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	title, err := request.GetFormValue(r, "title")
	if err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.RedirectToReferer(w, r)
		return
	}

	result, err := server.DB.Q.AddWikiPage(ctx, sql.AddWikiPageParams{
		Title:   title,
		Creator: data.User.AppuserID,
	})
	if err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.RedirectToReferer(w, r)
		return
	}

	data.Success(data.Language.GenericSuccess)
	request.Redirect(w, r, fmt.Sprintf("/wiki/view/%d", result.PageID))
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

func (server *Server) wikiUploadImage(w http.ResponseWriter, r *http.Request) {
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

	uploadResult := server.FileBackend.Upload(ctx, file, view.FileInfo{
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

	commitResult := server.FileBackend.Commit(ctx, []string{uploadResult.UniqueID})
	if commitResult.Error != nil {
		request.LogError(r, fmt.Errorf("committing image: %w", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	fileInfo := commitResult.Commited[uploadResult.UniqueID]
	fileID, err := server.DB.Q.RegisterFile(ctx, sql.RegisterFileParams{
		Uuid:          uploadResult.UniqueID,
		Creator:       request.MustLoadCommonData(ctx).User.AppuserID,
		Created:       pgtype.Timestamptz{Time: time.Now(), Valid: true},
		Accessibility: int32(enums.FileAccessibilityInternal),
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
		resp.File.URL = view.FileURL(fileID, fileInfo.FileName)
	}

	if err := server.DB.Q.AssociateFileWithWikiPage(ctx, sql.AssociateFileWithWikiPageParams{
		FileID: fileID,
		WikiID: wikiID,
	}); err != nil {
		request.LogError(r, fmt.Errorf("associating file %d with wiki page %d: %w", fileID, wikiID, err))
	}

	w.WriteHeader(http.StatusOK)
}

func (server *Server) wikiFetchImage(w http.ResponseWriter, r *http.Request) {
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
		if file, err := server.DB.Q.GetFileByID(ctx, fileID); err == nil {
			resp.Success = 1
			resp.File.URL = view.FileURL(fileID, file.PresentationFilename)
		} else {
			request.LogError(r, fmt.Errorf("no such file ID '%d': %w", fileID, err))
		}
	}

	if resp.Success == 0 {
		uploadResult := server.uploadImageFromURL(ctx, req.URL)
		if uploadResult.Error != nil {
			request.LogError(r, fmt.Errorf("uploading image: %w", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		commitResult := server.FileBackend.Commit(ctx, []string{uploadResult.UniqueID})
		if commitResult.Error != nil {
			request.LogError(r, fmt.Errorf("committing image: %w", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		fileInfo := commitResult.Commited[uploadResult.UniqueID]
		fileID, err = server.DB.Q.RegisterFile(ctx, sql.RegisterFileParams{
			Uuid:          uploadResult.UniqueID,
			Creator:       request.MustLoadCommonData(ctx).User.AppuserID,
			Created:       pgtype.Timestamptz{Time: time.Now(), Valid: true},
			Accessibility: int32(enums.FileAccessibilityInternal),
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
			resp.File.URL = view.FileURL(fileID, fileInfo.FileName)
		}
	}

	if err := server.DB.Q.AssociateFileWithWikiPage(ctx, sql.AssociateFileWithWikiPageParams{
		FileID: fileID,
		WikiID: wikiID,
	}); err != nil {
		request.LogError(r, fmt.Errorf("associating file %d with wiki page %d: %w", fileID, wikiID, err))
	}

	w.WriteHeader(http.StatusOK)
}

func (server *Server) uploadImageFromURL(ctx context.Context, url string) fs.UploadResult {
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

	info := view.FileInfo{
		FileName: name,
		MIMEType: ct,
		Size:     int64(len(imgBin)),
		Created:  time.Now(),
		Creator:  data.User.AppuserID,
	}

	r := bytes.NewReader(imgBin)
	result := server.FileBackend.Upload(ctx, r, info)
	return result
}
