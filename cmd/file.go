package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/view"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

const (
	MaxImageSize = 20 * 1024
)

func (server *Server) fileHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := server.getPathID(r, "id")
	if err != nil {
		ajaxError(w, r, err, http.StatusNotFound)
		return
	}

	file, err := server.Queries.GetFileByID(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			ajaxError(w, r, err, http.StatusNotFound)
		} else {
			ajaxError(w, r, err, http.StatusInternalServerError)
		}
		return
	}

	fileView := file.ToFileView()

	switch fileView.Accessibility {
	case enums.FileAccessibilityPublic:
	case enums.FileAccessibilityInternal:
		_, err := request.LoadCommonData(ctx)
		if err != nil {
			ajaxError(w, r, err, http.StatusUnauthorized)
			return
		}
	case enums.FileAccessibilityPersonal:
		data, err := request.LoadCommonData(ctx)
		if err != nil || data.User.AppuserID != fileView.Creator {
			ajaxError(w, r, err, http.StatusUnauthorized)
			return
		}
	}

	rc, err := server.FileBackend.Open(ctx, fileView.UUID, fileView.FileInfo())
	if err != nil {
		ajaxError(w, r, err, http.StatusInternalServerError)
		return
	}
	defer rc.Close()
	w.Header().Set("Content-Type", fileView.MIMEType)
	w.Header().Set("Content-Length", strconv.Itoa(int(fileView.Size)))
	if _, err := io.Copy(w, rc); err != nil {
		request.LogCtx(ctx, "failed to write out file: %w", err)
	}
}

func (server *Server) fileSetFilename(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := server.getPathID(r, "id")
	if err != nil {
		server.renderError(w, r, data, err)
		return
	}

	value, err := server.getFormValue(r, "value")
	if err != nil {
		server.renderError(w, r, data, err)
		return
	}

	if err := server.Queries.UpdatePresentationFilename(ctx, db.UpdatePresentationFilenameParams{
		Filename: value,
		ID:       id,
	}); err != nil {
		server.renderError(w, r, data, err)
		return
	}

	server.redirectToReferer(w, r)
}

func (server *Server) filePage(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	data.Subtitle = data.Language.FilesUploadHeader

	files, err := server.Queries.GetFilesAccessibleByUser(ctx, db.GetFilesAccessibleByUserParams{
		Creator:       data.User.AppuserID,
		Accessibility: int32(enums.FileAccessibilityPersonal),
	})
	if err != nil {
		data.Error(data.Language.TODO("Failed to load files"), err)
		files = nil
	}
	fileViews := SliceToSlice(files, func(in db.File) view.File {
		fv := in.ToFileView()
		return fv
	})
	fileViewLookupByID := map[int32]*view.File{}
	for i := range fileViews {
		fileViewLookupByID[fileViews[i].ID] = &fileViews[i]
	}

	fileWikiAssociations, err := server.Queries.GetFileWikiAssociationsAccessibleByUser(ctx, db.GetFileWikiAssociationsAccessibleByUserParams{
		Creator:       data.User.AppuserID,
		Accessibility: int32(enums.FileAccessibilityPersonal),
	})
	if err != nil {
		data.Error(data.Language.TODO("Failed to get file wiki associations"), err)
		fileWikiAssociations = nil
	}
	for _, fwa := range fileWikiAssociations {
		fileViewLookupByID[fwa.FileID].WikiLinks = append(fileViewLookupByID[fwa.FileID].WikiLinks, view.WikiLink{
			ID:    fwa.WikiID,
			Title: fwa.Title,
		})
	}

	filePatientAssociations, err := server.Queries.GetFilePatientAssociationsAccessibleByUser(ctx, db.GetFilePatientAssociationsAccessibleByUserParams{
		Creator:       data.User.AppuserID,
		Accessibility: int32(enums.FileAccessibilityPersonal),
	})
	if err != nil {
		data.Error(data.Language.TODO("Failed to get file patient associations"), err)
		filePatientAssociations = nil
	}
	for _, fpa := range filePatientAssociations {
		fileViewLookupByID[fpa.FileID].PatientLinks = append(fileViewLookupByID[fpa.FileID].PatientLinks, view.Patient{
			ID:   fpa.PatientID,
			Name: fpa.Name,
		})
	}

	_ = FileUploadPage(data, fileViews).Render(ctx, w)
}

func (server *Server) filepondSubmit(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	uuids, err := server.getFormMultiValue(r, "filepond")
	if err != nil {
		data.Error(data.Language.GenericFailed, err)
		server.redirect(w, r, "/file")
		return
	}

	result := server.FileBackend.Commit(ctx, uuids)
	if result.Error != nil {
		data.Error(data.Language.GenericFailed, result.Error)
		server.redirect(w, r, "/file")
		return
	}

	if err := server.Transaction(ctx, func(ctx context.Context, q *db.Queries) error {
		errs := []error{}
		for uuid, fileInfo := range result.Commited {
			_, err := server.Queries.RegisterFile(ctx, db.RegisterFileParams{
				Uuid:          uuid,
				Creator:       data.User.AppuserID,
				Created:       pgtype.Timestamptz{Time: time.Now(), Valid: true},
				Accessibility: int32(enums.FileAccessibilityInternal),
				Filename:      fileInfo.FileName,
				Mimetype:      fileInfo.MIMEType,
				Size:          fileInfo.Size,
			})
			if err != nil {
				errs = append(errs, fmt.Errorf("committing %s: %w"))
				data.Error(data.Language.GenericFailed, err)
			}
		}
		return errors.Join(errs...)
	}); err != nil {
		data.Error(data.Language.GenericFailed, result.Error)
		server.redirect(w, r, "/file")
		return
	}

	server.redirect(w, r, "/file")
}

// https://pqina.nl/filepond/docs/api/server/#process
func (server *Server) filepondProcess(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	// Parse multipart form with reasonable max memory
	err := r.ParseMultipartForm(MaxImageSize)
	if err != nil {
		ajaxError(w, r, err, http.StatusRequestEntityTooLarge)
		return
	}

	file, header, err := r.FormFile("filepond")
	if err != nil {
		ajaxError(w, r, err, http.StatusBadRequest)
		return
	}
	defer file.Close()

	result := server.FileBackend.Upload(ctx, file, view.FileInfo{
		FileName: header.Filename,
		MIMEType: header.Header.Get("Content-Type"),
		Size:     header.Size,
		Creator:  data.User.AppuserID,
		Created:  time.Now(),
	})
	if result.Error != nil {
		ajaxError(w, r, err, result.HTTPStatusCode)
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(result.UniqueID))
}

// https://pqina.nl/filepond/docs/api/server/#revert
func (server *Server) imageFilepondRevert(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	in, err := io.ReadAll(r.Body)
	if err != nil {
		ajaxError(w, r, err, http.StatusBadRequest)
		return
	}

	if result := server.FileBackend.DeleteTemp(ctx, string(in)); result.Error != nil {
		ajaxError(w, r, err, result.HTTPStatusCode)
		return
	}

	w.Header().Set("Content-Type", "text/plain")
}

// https://pqina.nl/filepond/docs/api/server/#restore
func (server *Server) imageFilepondRestore(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := server.getPathValue(r, "id")
	if err != nil {
		ajaxError(w, r, err, http.StatusInternalServerError)
	}

	res := server.FileBackend.ReadTemp(ctx, id)
	if res.Error != nil {
		ajaxError(w, r, res.Error, res.HTTPStatusCode)
		return
	}
	if res.Error != nil {
		ajaxError(w, r, res.Error, res.HTTPStatusCode)
		return
	}

	w.Header().Set("Content-Type", res.FileInfo.MIMEType)
	w.Header().Set("Content-Length", strconv.Itoa(len(res.Data)))
	w.Write(res.Data)
}

func (server *Server) fileDelete(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := server.getPathID(r, "id")
	if err != nil {
		data.Error(data.Language.GenericFailed, err)
		server.redirectToReferer(w, r)
		return
	}

	file, err := server.Queries.GetFileByID(ctx, id)
	if err != nil {
		data.Error(data.Language.GenericNotFound, err)
		server.redirectToReferer(w, r)
		return
	}

	if file.Creator != data.User.AppuserID {
		data.Error(data.Language.GenericUnauthorized, err)
		server.redirectToReferer(w, r)
		return
	}

	if err := server.Queries.DeregisterFile(ctx, id); err != nil {
		data.Error(data.Language.GenericFailed, err)
		server.redirectToReferer(w, r)
		return
	}

	if result := server.FileBackend.Delete(ctx, file.Uuid); result.Error != nil {
		ajaxError(w, r, err, result.HTTPStatusCode)
		return
	}

	data.Success(data.Language.GenericSuccess)
	server.redirectToReferer(w, r)
}
