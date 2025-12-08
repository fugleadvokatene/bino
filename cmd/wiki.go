package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"path"
	"strconv"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

func (server *Server) wikiMain(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := MustLoadCommonData(ctx)

	pages, err := server.Queries.GetWikiPages(ctx)
	if err != nil {
		server.renderError(w, r, data, err)
		return
	}

	mainPage, err := server.Queries.GetWikiMainPage(ctx)
	if err != nil {
		server.renderError(w, r, data, err)
		return
	}

	data.Subtitle = mainPage.Title

	_ = WikiPageTempl(
		data,
		mainPage.ToWikiPageView(),
		SliceToSlice(pages, func(in WikiPage) WikiLinkView {
			return in.ToWikiLinkView()
		}),
	).Render(ctx, w)
}

func (server *Server) wikiPage(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := MustLoadCommonData(ctx)

	id, err := server.getPathID(r, "id")
	if err != nil {
		server.render404(w, r, data, err)
		return
	}

	pages, err := server.Queries.GetWikiPages(ctx)
	if err != nil {
		server.renderError(w, r, data, err)
		return
	}

	page, err := server.Queries.GetLastWikiRevision(ctx, id)
	if err != nil {
		server.renderError(w, r, data, err)
		return
	}

	data.Subtitle = page.Title

	_ = WikiPageTempl(
		data,
		page.ToWikiPageView(),
		SliceToSlice(pages, func(in WikiPage) WikiLinkView {
			return in.ToWikiLinkView()
		}),
	).Render(ctx, w)
}

func (server *Server) wikiSave(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := MustLoadCommonData(ctx)

	id, err := server.getPathID(r, "id")
	if err != nil {
		ajaxError(w, r, err, http.StatusBadRequest)
		return
	}

	bytes, err := io.ReadAll(r.Body)
	if err != nil {
		ajaxError(w, r, err, http.StatusBadRequest)
		return
	}

	if _, err := server.Queries.SaveWikiPage(ctx, SaveWikiPageParams{
		PageID:  id,
		Content: bytes,
		Editor:  data.User.AppuserID,
	}); err != nil {
		ajaxError(w, r, err, http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (server *Server) wikiSetTitle(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := MustLoadCommonData(ctx)

	id, err := server.getPathID(r, "id")
	if err != nil {
		server.renderError(w, r, data, err)
		return
	}

	title, err := server.getFormValue(r, "value")
	if err != nil {
		server.renderError(w, r, data, err)
		return
	}

	if err := server.Queries.SetWikiPageTitle(ctx, SetWikiPageTitleParams{
		ID:    id,
		Title: title,
	}); err != nil {
		server.renderError(w, r, data, err)
		return
	}

	server.redirect(w, r, fmt.Sprintf("/wiki/view/%d", id))
}

func (server *Server) wikiCreate(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := MustLoadCommonData(ctx)

	title, err := server.getFormValue(r, "title")
	if err != nil {
		data.Error(data.Language.GenericFailed, err)
		server.redirectToReferer(w, r)
		return
	}

	result, err := server.Queries.AddWikiPage(ctx, AddWikiPageParams{
		Title:   title,
		Creator: data.User.AppuserID,
	})
	if err != nil {
		data.Error(data.Language.GenericFailed, err)
		server.redirectToReferer(w, r)
		return
	}

	data.Success(data.Language.GenericSuccess)
	server.redirect(w, r, fmt.Sprintf("/wiki/view/%d", result.PageID))
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
	data := MustLoadCommonData(ctx)

	var resp WikiImageResponse
	defer func() {
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			logError(r, fmt.Errorf("encoding output response: %w", err))
		}
	}()

	wikiID, err := server.getPathID(r, "id")
	if err != nil {
		logError(r, fmt.Errorf("getting ID from path: %w", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Parse multipart form with reasonable max memory
	if err := r.ParseMultipartForm(MaxImageSize); err != nil {
		logError(r, fmt.Errorf("reading request body: %w", err))
		w.WriteHeader(http.StatusRequestEntityTooLarge)
		return
	}

	file, header, err := r.FormFile("image")
	if err != nil {
		logError(r, fmt.Errorf("getting form file: %w", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	defer file.Close()

	uploadResult := server.FileBackend.Upload(ctx, file, FileInfo{
		FileName: header.Filename,
		MIMEType: header.Header.Get("Content-Type"),
		Size:     header.Size,
		Creator:  data.User.AppuserID,
		Created:  time.Now(),
	})
	if uploadResult.Error != nil {
		logError(r, fmt.Errorf("uploading file file: %w", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	commitResult := server.FileBackend.Commit(ctx, []string{uploadResult.UniqueID})
	if commitResult.Error != nil {
		logError(r, fmt.Errorf("committing image: %w", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	fileInfo := commitResult.Commited[uploadResult.UniqueID]
	fileID, err := server.Queries.RegisterFile(ctx, RegisterFileParams{
		Uuid:          uploadResult.UniqueID,
		Creator:       MustLoadCommonData(ctx).User.AppuserID,
		Created:       pgtype.Timestamptz{Time: time.Now(), Valid: true},
		Accessibility: int32(FileAccessibilityInternal),
		Filename:      fileInfo.FileName,
		Mimetype:      fileInfo.MIMEType,
		Size:          fileInfo.Size,
	})
	if err != nil {
		logError(r, fmt.Errorf("registering file to db: %w", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	} else {
		resp.Success = 1
		resp.File.URL = FileURL(fileID, fileInfo.FileName)
	}

	if err := server.Queries.AssociateFileWithWikiPage(ctx, AssociateFileWithWikiPageParams{
		FileID: fileID,
		WikiID: wikiID,
	}); err != nil {
		logError(r, fmt.Errorf("associating file %d with wiki page %d: %w", fileID, wikiID, err))
	}

	w.WriteHeader(http.StatusOK)
}

func (server *Server) wikiFetchImage(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var resp WikiImageResponse
	defer func() {
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			logError(r, fmt.Errorf("encoding output response: %w", err))
		}
	}()

	wikiID, err := server.getPathID(r, "id")
	if err != nil {
		logError(r, fmt.Errorf("getting ID from path: %w", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	bytes, err := io.ReadAll(r.Body)
	if err != nil {
		logError(r, fmt.Errorf("reading request body: %w", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var req WikiFetchImageRequest
	if err := json.Unmarshal(bytes, &req); err != nil {
		logError(r, fmt.Errorf("unmarshalling request body: %w", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var fileID int32
	if fileID, err = server.parseFileURLFromSameSite(r, req.URL); err == nil {
		if file, err := server.Queries.GetFileByID(ctx, fileID); err == nil {
			resp.Success = 1
			resp.File.URL = FileURL(fileID, file.PresentationFilename)
		} else {
			logError(r, fmt.Errorf("no such file ID '%d': %w", fileID, err))
		}
	}

	if resp.Success == 0 {
		uploadResult := server.uploadImageFromURL(ctx, req.URL)
		if uploadResult.Error != nil {
			logError(r, fmt.Errorf("uploading image: %w", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		commitResult := server.FileBackend.Commit(ctx, []string{uploadResult.UniqueID})
		if commitResult.Error != nil {
			logError(r, fmt.Errorf("committing image: %w", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		fileInfo := commitResult.Commited[uploadResult.UniqueID]
		fileID, err = server.Queries.RegisterFile(ctx, RegisterFileParams{
			Uuid:          uploadResult.UniqueID,
			Creator:       MustLoadCommonData(ctx).User.AppuserID,
			Created:       pgtype.Timestamptz{Time: time.Now(), Valid: true},
			Accessibility: int32(FileAccessibilityInternal),
			Filename:      fileInfo.FileName,
			Mimetype:      fileInfo.MIMEType,
			Size:          fileInfo.Size,
		})
		if err != nil {
			logError(r, fmt.Errorf("registering file to db: %w", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		} else {
			resp.Success = 1
			resp.File.URL = FileURL(fileID, fileInfo.FileName)
		}
	}

	if err := server.Queries.AssociateFileWithWikiPage(ctx, AssociateFileWithWikiPageParams{
		FileID: fileID,
		WikiID: wikiID,
	}); err != nil {
		logError(r, fmt.Errorf("associating file %d with wiki page %d: %w", fileID, wikiID, err))
	}

	w.WriteHeader(http.StatusOK)
}

func (s *Server) parseFileURLFromSameSite(r *http.Request, raw string) (int32, error) {
	ref := r.Referer()
	if ref == "" {
		return 0, fmt.Errorf("no referer")
	}

	refURL, err := url.Parse(ref)
	if err != nil {
		return 0, err
	}

	rawURL, err := url.Parse(raw)
	if err != nil {
		return 0, err
	}

	if rawURL.Host != "" && rawURL.Host != refURL.Host {
		return 0, fmt.Errorf("not same site")
	}

	parts := strings.Split(strings.Trim(rawURL.Path, "/"), "/")
	if len(parts) != 3 || parts[0] != "file" {
		return 0, fmt.Errorf("invalid path")
	}

	id64, err := strconv.ParseInt(parts[1], 10, 32)
	if err != nil {
		return 0, err
	}

	return int32(id64), nil
}

func (server *Server) uploadImageFromURL(ctx context.Context, url string) UploadResult {
	data := MustLoadCommonData(ctx)

	resp, err := http.Get(url)
	if err != nil {
		return UploadResult{Error: err}
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return UploadResult{Error: fmt.Errorf("server response: %w", resp.StatusCode)}
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

	info := FileInfo{
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
