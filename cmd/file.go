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
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/view"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

func (server *Server) fileHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathID(r, "id")
	if err != nil {
		request.AjaxError(w, r, err, http.StatusNotFound)
		return
	}

	file, err := server.DB.Q.GetFileByID(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			request.AjaxError(w, r, err, http.StatusNotFound)
		} else {
			request.AjaxError(w, r, err, http.StatusInternalServerError)
		}
		return
	}

	fileView := file.ToFileView()

	switch fileView.Accessibility {
	case enums.FileAccessibilityPublic:
	case enums.FileAccessibilityInternal:
		_, err := request.LoadCommonData(ctx)
		if err != nil {
			request.AjaxError(w, r, err, http.StatusUnauthorized)
			return
		}
	case enums.FileAccessibilityPersonal:
		data, err := request.LoadCommonData(ctx)
		if err != nil || data.User.AppuserID != fileView.Creator {
			request.AjaxError(w, r, err, http.StatusUnauthorized)
			return
		}
	}

	rc, err := server.FileBackend.Open(ctx, fileView.UUID, fileView.FileInfo())
	if err != nil {
		request.AjaxError(w, r, err, http.StatusInternalServerError)
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

	id, err := request.GetPathID(r, "id")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	value, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := server.DB.Q.UpdatePresentationFilename(ctx, sql.UpdatePresentationFilenameParams{
		Filename: value,
		ID:       id,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func (server *Server) filePage(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	data.Subtitle = data.Language.FilesUploadHeader

	files, err := server.DB.Q.GetFilesAccessibleByUser(ctx, sql.GetFilesAccessibleByUserParams{
		Creator:       data.User.AppuserID,
		Accessibility: int32(enums.FileAccessibilityPersonal),
	})
	if err != nil {
		data.Error(data.Language.TODO("Failed to load files"), err)
		files = nil
	}
	fileViews := generic.SliceToSlice(files, func(in sql.File) view.File {
		fv := in.ToFileView()
		return fv
	})
	fileViewLookupByID := map[int32]*view.File{}
	for i := range fileViews {
		fileViewLookupByID[fileViews[i].ID] = &fileViews[i]
	}

	fileWikiAssociations, err := server.DB.Q.GetFileWikiAssociationsAccessibleByUser(ctx, sql.GetFileWikiAssociationsAccessibleByUserParams{
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

	filePatientAssociations, err := server.DB.Q.GetFilePatientAssociationsAccessibleByUser(ctx, sql.GetFilePatientAssociationsAccessibleByUserParams{
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

	uuids, err := request.GetFormMultiValue(r, "filepond")
	if err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.Redirect(w, r, "/file")
		return
	}

	result := server.FileBackend.Commit(ctx, uuids)
	if result.Error != nil {
		data.Error(data.Language.GenericFailed, result.Error)
		request.Redirect(w, r, "/file")
		return
	}

	if err := server.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		errs := []error{}
		for uuid, fileInfo := range result.Commited {
			_, err := server.DB.Q.RegisterFile(ctx, sql.RegisterFileParams{
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
		request.Redirect(w, r, "/file")
		return
	}

	request.Redirect(w, r, "/file")
}

// https://pqina.nl/filepond/docs/api/server/#process
func (server *Server) filepondProcess(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	// Parse multipart form with reasonable max memory
	err := r.ParseMultipartForm(fs.MaxImageSize)
	if err != nil {
		request.AjaxError(w, r, err, http.StatusRequestEntityTooLarge)
		return
	}

	file, header, err := r.FormFile("filepond")
	if err != nil {
		request.AjaxError(w, r, err, http.StatusBadRequest)
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
		request.AjaxError(w, r, err, result.HTTPStatusCode)
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
		request.AjaxError(w, r, err, http.StatusBadRequest)
		return
	}

	if result := server.FileBackend.DeleteTemp(ctx, string(in)); result.Error != nil {
		request.AjaxError(w, r, err, result.HTTPStatusCode)
		return
	}

	w.Header().Set("Content-Type", "text/plain")
}

// https://pqina.nl/filepond/docs/api/server/#restore
func (server *Server) imageFilepondRestore(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := request.GetPathValue(r, "id")
	if err != nil {
		request.AjaxError(w, r, err, http.StatusInternalServerError)
	}

	res := server.FileBackend.ReadTemp(ctx, id)
	if res.Error != nil {
		request.AjaxError(w, r, res.Error, res.HTTPStatusCode)
		return
	}
	if res.Error != nil {
		request.AjaxError(w, r, res.Error, res.HTTPStatusCode)
		return
	}

	w.Header().Set("Content-Type", res.FileInfo.MIMEType)
	w.Header().Set("Content-Length", strconv.Itoa(len(res.Data)))
	w.Write(res.Data)
}

func (server *Server) fileDelete(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "id")
	if err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.RedirectToReferer(w, r)
		return
	}

	file, err := server.DB.Q.GetFileByID(ctx, id)
	if err != nil {
		data.Error(data.Language.GenericNotFound, err)
		request.RedirectToReferer(w, r)
		return
	}

	if file.Creator != data.User.AppuserID {
		data.Error(data.Language.GenericUnauthorized, err)
		request.RedirectToReferer(w, r)
		return
	}

	if err := server.DB.Q.DeregisterFile(ctx, id); err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.RedirectToReferer(w, r)
		return
	}

	if result := server.FileBackend.Delete(ctx, file.Uuid); result.Error != nil {
		request.AjaxError(w, r, err, result.HTTPStatusCode)
		return
	}

	data.Success(data.Language.GenericSuccess)
	request.RedirectToReferer(w, r)
}
