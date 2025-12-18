package fs

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"

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
	Commited       map[string]model.FileInfo
	Failed         []string
	Error          error
	HTTPStatusCode int
}

type ListTempResult struct {
	Files map[string]model.FileInfo
	Error error
}

type FileStorage interface {
	// Upload to temporary storage
	Upload(ctx context.Context, data io.Reader, fileInfo model.FileInfo) UploadResult
	// Delete from temporary storage
	DeleteTemp(ctx context.Context, ID string) DeleteResult
	// Read file from temporary storage
	ReadTemp(ctx context.Context, ID string) ReadResult
	// List files in temporary storage
	ListTemp(ctx context.Context) ListTempResult
	// Commit files from temporary storage to real storage
	Commit(ctx context.Context, IDs []string) CommitResult
	// Open file
	Open(ctx context.Context, ID string, fileInfo model.FileInfo) (io.ReadCloser, error)
	// Delete file
	Delete(ctx context.Context, ID string) DeleteResult
}

// LOCAL FILE API

type LocalFileStorage struct {
	MainDirectory string
	TmpDirectory  string
}

func NewLocalFileStorage(ctx context.Context, mainDir, tmpDir string) *LocalFileStorage {
	if err := os.MkdirAll(mainDir, os.ModePerm); err != nil {
		panic(fmt.Errorf("creating mainDir='%s': %w", mainDir, err))
	}
	if err := os.MkdirAll(tmpDir, os.ModePerm); err != nil {
		panic(fmt.Errorf("creating tmpDir='%s': %w", tmpDir, err))
	}
	return &LocalFileStorage{
		MainDirectory: mainDir,
		TmpDirectory:  tmpDir,
	}
}

func (lfs *LocalFileStorage) Upload(ctx context.Context, data io.Reader, fileInfo model.FileInfo) (out UploadResult) {
	id := uuid.New().String()

	// Open the file base directory
	dir, err := os.OpenRoot(lfs.TmpDirectory)
	if err != nil {
		return UploadResult{
			Error:          err,
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}
	defer dir.Close()

	// Create UUID subdirectory
	if err := dir.Mkdir(id, os.ModePerm); err != nil {
		return UploadResult{
			Error:          fmt.Errorf("creating file directory: %w", err),
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}

	// Create the metadata file
	metaFile, err := dir.Create(id + "/metadata.json")
	if err != nil {
		return UploadResult{
			Error:          fmt.Errorf("creating metadata.json: %w", err),
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
	file, err := dir.Create(id + "/" + fileInfo.FileName)
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

func (lfs *LocalFileStorage) delete(ctx context.Context, dirname string, id string) (out DeleteResult) {
	if err := uuid.Validate(id); err != nil {
		return DeleteResult{
			Error:          fmt.Errorf("'%s' is not a valid UUID: %w", id, err),
			HTTPStatusCode: http.StatusBadRequest,
		}
	}

	// Open the file base directory
	dir, err := os.OpenRoot(dirname)
	if err != nil {
		return DeleteResult{
			Error:          err,
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}
	defer dir.Close()

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

func (lfs *LocalFileStorage) DeleteTemp(ctx context.Context, id string) (out DeleteResult) {
	return lfs.delete(ctx, lfs.TmpDirectory, id)
}

func (lfs *LocalFileStorage) readMetaFile(ctx context.Context, dir *os.Root, id string) (model.FileInfo, error) {
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

func (lfs *LocalFileStorage) ListTemp(ctx context.Context) (out ListTempResult) {
	out.Files = map[string]model.FileInfo{}

	dir, err := os.OpenRoot(lfs.TmpDirectory)
	if err != nil {
		return ListTempResult{
			Error: err,
		}
	}
	defer dir.Close()

	entries, err := os.ReadDir(lfs.TmpDirectory)
	if err != nil {
		return ListTempResult{Error: err}
	}

	for _, entry := range entries {
		name := entry.Name()
		if entry.IsDir() && uuid.Validate(name) == nil {
			if info, err := lfs.readMetaFile(ctx, dir, name); err == nil {
				out.Files[name] = info
			}
		}
	}

	return out
}

func (lfs *LocalFileStorage) ReadTemp(ctx context.Context, id string) (out ReadResult) {
	cd := request.MustLoadCommonData(ctx)

	if err := uuid.Validate(id); err != nil {
		return ReadResult{
			Error:          fmt.Errorf("'%s' is not a valid UUID: %w", id, err),
			HTTPStatusCode: http.StatusBadRequest,
		}
	}
	dir, err := os.OpenRoot(lfs.TmpDirectory)
	if err != nil {
		return ReadResult{
			Error:          err,
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}
	defer dir.Close()

	info, err := lfs.readMetaFile(ctx, dir, id)
	if err != nil {
		return ReadResult{
			Error:          err,
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}

	file, err := dir.Open(id + "/" + info.FileName)
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

func (lfs *LocalFileStorage) Commit(ctx context.Context, ids []string) CommitResult {
	var out CommitResult
	out.Commited = map[string]model.FileInfo{}
	out.HTTPStatusCode = http.StatusOK

	dir, err := os.OpenRoot(lfs.MainDirectory)
	if err != nil {
		return CommitResult{
			Error:          err,
			HTTPStatusCode: http.StatusInternalServerError,
		}
	}
	defer dir.Close()

	for _, id := range ids {
		if id == "" {
			out.Error = fmt.Errorf("got empty uuid")
			out.Failed = append(out.Failed, id)
			slog.Warn("Empty UUID")
			continue
		}
		tmpDir := lfs.TmpDirectory + "/" + id
		mainDir := lfs.MainDirectory + "/" + id
		if err := os.Rename(tmpDir, mainDir); err != nil {
			out.Failed = append(out.Failed, id)
			out.Error = err
			out.HTTPStatusCode = http.StatusInternalServerError
		} else {
			meta, err := lfs.readMetaFile(ctx, dir, id)
			if err != nil {
				out.Failed = append(out.Failed, id)
				out.Error = err
				out.HTTPStatusCode = http.StatusInternalServerError
			} else {
				out.Commited[id] = meta
			}
		}
	}
	return out
}

func (lfs *LocalFileStorage) Open(ctx context.Context, id string, info model.FileInfo) (io.ReadCloser, error) {
	dir, err := os.OpenRoot(lfs.MainDirectory)
	if err != nil {
		return nil, err
	}
	defer dir.Close()

	file, err := dir.Open(id + "/" + info.FileName)
	if err != nil {
		return nil, err
	}
	return file, nil
}

func (lfs *LocalFileStorage) Delete(ctx context.Context, id string) (out DeleteResult) {
	return lfs.delete(ctx, lfs.MainDirectory, id)
}
