package db

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

const (
	MaxImageSize = 20 * 1024 * 1024
)

func (db *Database) UploadFile(ctx context.Context, data io.Reader, fileInfo model.FileInfo) (string, error) {
	id := uuid.New().String()

	// Create UUID subdirectory
	if err := db.TmpRoot.Mkdir(id, 0700); err != nil {
		return "", newFileError(http.StatusInternalServerError, "creating file directory: %w", err)
	}

	// Create the metadata file
	metaFile, err := db.TmpRoot.Create(id + "/metadata.json")
	if err != nil {
		return "", newFileError(http.StatusInternalServerError, "creating metadata.json: %w", err)
	}
	if err := metaFile.Chmod(0600); err != nil {
		return "", newFileError(http.StatusInternalServerError, "chmod metadata.json 0600: %w", err)
	}
	defer metaFile.Close()
	jsonWriter := json.NewEncoder(metaFile)
	if err := jsonWriter.Encode(fileInfo); err != nil {
		return "", newFileError(http.StatusInternalServerError, "writing metadata.json: %w", err)
	}

	// Create the file
	file, err := db.TmpRoot.Create(id + "/" + fileInfo.FileName)
	if err != nil {
		return "", newFileError(http.StatusInternalServerError, "creating %s: %w", fileInfo.FileName, err)
	}
	defer file.Close()
	if err := file.Chmod(0600); err != nil {
		return "", newFileError(http.StatusInternalServerError, "chmod %s 0600: %w", fileInfo.FileName, err)
	}

	// Copy file data
	if n, err := io.Copy(file, data); err != nil {
		return "", newFileError(http.StatusInternalServerError, "writing file contents: %w", err)
	} else if n != fileInfo.Size {
		return "", newFileError(http.StatusInternalServerError, "file size expected %d wrote %d", fileInfo.Size, n)
	}

	return id, nil
}

func (db *Database) deleteFile(_ context.Context, dir *os.Root, id string) error {
	if err := uuid.Validate(id); err != nil {
		return newFileError(http.StatusBadRequest, "'%s' is not a valid UUID: %w", id, err)
	}

	// Delete directory
	if err := dir.RemoveAll(id); err != nil {
		return newFileError(http.StatusInternalServerError, "%w", err)
	}

	return nil
}

func (db *Database) DeleteTempFile(ctx context.Context, id string) error {
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

func (db *Database) ListTempFileDirectory(ctx context.Context) (map[string]model.FileInfo, error) {
	entries, err := os.ReadDir(db.tmpDirectory)
	if err != nil {
		return nil, err
	}

	out := map[string]model.FileInfo{}
	for _, entry := range entries {
		name := entry.Name()
		if entry.IsDir() && uuid.Validate(name) == nil {
			if info, err := db.readMetaFile(ctx, db.TmpRoot, name); err == nil {
				out[name] = info
			}
		}
	}

	return out, nil
}

func (db *Database) ReadTempFile(ctx context.Context, id string) ([]byte, model.FileInfo, error) {
	cd := request.MustLoadCommonData(ctx)

	if err := uuid.Validate(id); err != nil {
		return nil, model.FileInfo{}, newFileError(http.StatusBadRequest, "'%s' is not a valid UUID: %w", id, err)
	}

	info, err := db.readMetaFile(ctx, db.TmpRoot, id)
	if err != nil {
		return nil, model.FileInfo{}, fmt.Errorf("reading meta file: %w", err)
	}

	file, err := db.TmpRoot.Open(id + "/" + info.FileName)
	if err != nil {
		return nil, model.FileInfo{}, newFileError(http.StatusBadRequest, "%w", err)
	}

	stat, err := file.Stat()
	if err != nil {
		file.Close()
		return nil, model.FileInfo{}, err
	}

	if size := stat.Size(); size > MaxImageSize {
		cd.Log(slog.LevelWarn, "file too large", "size", size, "maxsize", MaxImageSize)
		file.Close()
		return nil, model.FileInfo{}, newFileError(http.StatusRequestEntityTooLarge, "file too large")
	}

	data, err := io.ReadAll(file)
	file.Close()
	if err != nil {
		return nil, model.FileInfo{}, err
	}

	return data, info, nil
}

func (db *Database) CommitFile(ctx context.Context, uuid string) (model.FileInfo, int32, error) {
	if uuid == "" {
		return model.FileInfo{}, 0, fmt.Errorf("got empty uuid")
	}
	tmpDir := db.tmpDirectory + "/" + uuid
	mainDir := db.mainDirectory + "/" + uuid
	if err := os.Rename(tmpDir, mainDir); err != nil {
		return model.FileInfo{}, 0, err
	}
	meta, err := db.readMetaFile(ctx, db.MainRoot, uuid)
	if err != nil {
		return model.FileInfo{}, 0, err
	}

	hash, err := db.Sha256File(ctx, db.MainRoot, uuid, meta.FileName)
	if err != nil {
		slog.ErrorContext(ctx, "Couldn't create file hash", "err", err, "uuid", uuid, "filename", meta.FileName)
		hash = nil
	}

	fileID, err := db.Q.PublishFile(ctx, sql.PublishFileParams{
		Uuid:          uuid,
		Creator:       meta.Creator,
		Created:       pgtype.Timestamptz{Time: time.Now(), Valid: true},
		Accessibility: int32(model.FileAccessibilityInternal),
		Filename:      meta.FileName,
		Mimetype:      meta.MIMEType,
		Size:          meta.Size,
		Sha256:        hash,
	})

	if err != nil {
		return meta, 0, err
	}
	return meta, fileID, err
}

func (db *Database) OpenFile(ctx context.Context, id string, filename string) (io.ReadCloser, error) {
	file, err := db.MainRoot.Open(id + "/" + filename)
	if err != nil {
		return nil, err
	}
	return file, nil
}

func (db *Database) DeleteFile(ctx context.Context, id string) error {
	return db.deleteFile(ctx, db.MainRoot, id)
}
