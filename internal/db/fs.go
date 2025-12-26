package db

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/google/uuid"
)

const (
	MaxImageSize = 20 * 1024 * 1024
)

// INTERFACE

type UploadResult struct {
	UniqueID       string
	Error          error
	HTTPStatusCode int
}

type DeleteResult struct {
	Error          error
	HTTPStatusCode int
}

type ReadResult struct {
	Data           []byte
	FileInfo       model.FileInfo
	Error          error
	HTTPStatusCode int
}

type CommitResult struct {
	Commited       model.FileInfo
	Error          error
	HTTPStatusCode int
}

type ListTempResult struct {
	Files map[string]model.FileInfo
	Error error
}

func (db *Database) UploadFile(ctx context.Context, data io.Reader, fileInfo model.FileInfo) (out UploadResult) {
	id := uuid.New().String()

	// Create UUID subdirectory
	if err := db.TmpRoot.Mkdir(id, 0700); err != nil {
		return UploadResult{
			Error:          fmt.Errorf("creating file directory: %w", err),
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}

	// Create the metadata file
	metaFile, err := db.TmpRoot.Create(id + "/metadata.json")
	if err != nil {
		return UploadResult{
			Error:          fmt.Errorf("creating metadata.json: %w", err),
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}
	if err := metaFile.Chmod(0600); err != nil {
		return UploadResult{
			Error:          fmt.Errorf("chmod metadata.json 0600: %w", err),
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}
	defer func() {
		if err := metaFile.Close(); out.Error == nil && err != nil {
			out.Error = fmt.Errorf("closing metadata.json: %w", err)
			out.HTTPStatusCode = http.StatusInternalServerError
			out.UniqueID = ""
		}
	}()
	jsonWriter := json.NewEncoder(metaFile)
	if err := jsonWriter.Encode(fileInfo); err != nil {
		return UploadResult{
			Error:          fmt.Errorf("writing metadata.json: %w", err),
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}

	// Create the file
	file, err := db.TmpRoot.Create(id + "/" + fileInfo.FileName)
	if err != nil {
		return UploadResult{
			Error:          fmt.Errorf("creating %s: %w", fileInfo.FileName, err),
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}
	defer func() {
		if err := file.Close(); out.Error == nil && err != nil {
			out.Error = fmt.Errorf("closing file: %w", err)
			out.HTTPStatusCode = http.StatusInternalServerError
			out.UniqueID = ""
		}
	}()
	if err := file.Chmod(0600); err != nil {
		return UploadResult{
			Error:          fmt.Errorf("chmod file 0600: %w", err),
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}

	// Copy file data
	if n, err := io.Copy(file, data); err != nil {
		return UploadResult{
			Error:          fmt.Errorf("writing file contents: %w", err),
			HTTPStatusCode: http.StatusInternalServerError,
		}
	} else if n != fileInfo.Size {
		return UploadResult{
			Error:          fmt.Errorf("file size expected %d wrote %d", fileInfo.Size, n),
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}

	return UploadResult{
		UniqueID:       id,
		Error:          nil,
		HTTPStatusCode: http.StatusOK,
	}
}

func (db *Database) deleteFile(_ context.Context, dir *os.Root, id string) (out DeleteResult) {
	if err := uuid.Validate(id); err != nil {
		return DeleteResult{
			Error:          fmt.Errorf("'%s' is not a valid UUID: %w", id, err),
			HTTPStatusCode: http.StatusBadRequest,
		}
	}

	// Delete directory
	if err := dir.RemoveAll(id); err != nil {
		return DeleteResult{
			Error:          err,
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}

	return DeleteResult{
		HTTPStatusCode: http.StatusOK,
	}
}

func (db *Database) DeleteTempFile(ctx context.Context, id string) (out DeleteResult) {
	return db.deleteFile(ctx, db.TmpRoot, id)
}

func (db *Database) readMetaFile(_ context.Context, dir *os.Root, id string) (model.FileInfo, error) {
	metaFile, err := dir.Open(id + "/metadata.json")
	if err != nil {
		return model.FileInfo{}, err
	}
	var info model.FileInfo
	if err := json.NewDecoder(metaFile).Decode(&info); err != nil {
		metaFile.Close()
		return model.FileInfo{}, err
	}
	metaFile.Close()

	return info, nil
}

func (db *Database) ListTempFileDirectory(ctx context.Context) (out ListTempResult) {
	out.Files = map[string]model.FileInfo{}

	entries, err := os.ReadDir(db.tmpDirectory)
	if err != nil {
		return ListTempResult{Error: err}
	}

	for _, entry := range entries {
		name := entry.Name()
		if entry.IsDir() && uuid.Validate(name) == nil {
			if info, err := db.readMetaFile(ctx, db.TmpRoot, name); err == nil {
				out.Files[name] = info
			}
		}
	}

	return out
}

func (db *Database) ReadTempFile(ctx context.Context, id string) (out ReadResult) {
	cd := request.MustLoadCommonData(ctx)

	if err := uuid.Validate(id); err != nil {
		return ReadResult{
			Error:          fmt.Errorf("'%s' is not a valid UUID: %w", id, err),
			HTTPStatusCode: http.StatusBadRequest,
		}
	}

	info, err := db.readMetaFile(ctx, db.TmpRoot, id)
	if err != nil {
		return ReadResult{
			Error:          err,
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}

	file, err := db.TmpRoot.Open(id + "/" + info.FileName)
	if err != nil {
		return ReadResult{
			Error:          err,
			HTTPStatusCode: http.StatusNotFound,
		}
	}

	stat, err := file.Stat()
	if err != nil {
		file.Close()
		return ReadResult{
			Error:          err,
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}

	if size := stat.Size(); size > MaxImageSize {
		cd.Log(slog.LevelWarn, "file too large", "size", size, "maxsize", MaxImageSize)
		file.Close()
		return ReadResult{
			Error:          fmt.Errorf("file too large"),
			HTTPStatusCode: http.StatusRequestEntityTooLarge,
		}
	}

	data, err := io.ReadAll(file)
	file.Close()
	if err != nil {
		return ReadResult{
			Error:          err,
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}

	return ReadResult{
		Data:           data,
		FileInfo:       info,
		HTTPStatusCode: http.StatusOK,
	}
}

func (db *Database) CommitFile(ctx context.Context, uuid string) CommitResult {
	var out CommitResult
	out.Commited = model.FileInfo{}
	out.HTTPStatusCode = http.StatusOK
	if uuid == "" {
		out.Error = fmt.Errorf("got empty uuid")
		slog.Warn("Empty UUID")
		return out
	}
	tmpDir := db.tmpDirectory + "/" + uuid
	mainDir := db.mainDirectory + "/" + uuid
	if err := os.Rename(tmpDir, mainDir); err != nil {
		out.Error = err
		out.HTTPStatusCode = http.StatusInternalServerError
		return out
	}
	meta, err := db.readMetaFile(ctx, db.MainRoot, uuid)
	if err != nil {
		out.Error = err
		out.HTTPStatusCode = http.StatusInternalServerError
		return out
	}
	out.Commited = meta
	return out
}

func (db *Database) CommitFiles(ctx context.Context, ids []string) map[string]CommitResult {
	return generic.SliceToMap(ids, func(id string) (string, CommitResult) {
		return id, db.CommitFile(ctx, id)
	})
}

func (db *Database) OpenFile(ctx context.Context, id string, filename string) (io.ReadCloser, error) {
	file, err := db.MainRoot.Open(id + "/" + filename)
	if err != nil {
		return nil, err
	}
	return file, nil
}

func (db *Database) DeleteFile(ctx context.Context, id string) (out DeleteResult) {
	return db.deleteFile(ctx, db.MainRoot, id)
}
