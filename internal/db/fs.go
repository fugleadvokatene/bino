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

	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

const (
	MaxImageSize = 20 * 1024 * 1024
)

type fileInfo struct {
	FileName string
	MIMEType string
	Size     int64
	Created  time.Time
}

func (db *Database) UploadFile(
	ctx context.Context,
	data io.Reader,
	filename string,
	mimeType string,
	size int64,
) (string, error) {
	uuid := uuid.New().String()

	fileInfo := fileInfo{
		FileName: filename,
		MIMEType: mimeType,
		Size:     size,
		Created:  time.Now(),
	}

	// Create UUID subdirectory
	if err := db.TmpRoot.Mkdir(uuid, 0700); err != nil {
		return "", newFileError(http.StatusInternalServerError, "creating file directory: %w", err)
	}

	// Create the metadata file
	metaFile, err := db.TmpRoot.Create(uuid + "/metadata.json")
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
	file, err := db.TmpRoot.Create(uuid + "/" + fileInfo.FileName)
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

	return uuid, nil
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

func (db *Database) readMetaFile(_ context.Context, dir *os.Root, id string) (fileInfo, error) {
	metaFile, err := dir.Open(id + "/metadata.json")
	if err != nil {
		return fileInfo{}, err
	}
	var info fileInfo
	if err := json.NewDecoder(metaFile).Decode(&info); err != nil {
		metaFile.Close()
		return fileInfo{}, err
	}
	metaFile.Close()

	return info, nil
}

func (db *Database) ListTempFileDirectory(ctx context.Context) (map[string]fileInfo, error) {
	entries, err := os.ReadDir(db.tmpDirectory)
	if err != nil {
		return nil, err
	}

	out := map[string]fileInfo{}
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

func (db *Database) ReadTempFile(ctx context.Context, id string) ([]byte, fileInfo, error) {
	cd := request.MustLoadCommonData(ctx)

	if err := uuid.Validate(id); err != nil {
		return nil, fileInfo{}, newFileError(http.StatusBadRequest, "'%s' is not a valid UUID: %w", id, err)
	}

	info, err := db.readMetaFile(ctx, db.TmpRoot, id)
	if err != nil {
		return nil, fileInfo{}, fmt.Errorf("reading meta file: %w", err)
	}

	file, err := db.TmpRoot.Open(id + "/" + info.FileName)
	if err != nil {
		return nil, fileInfo{}, newFileError(http.StatusBadRequest, "%w", err)
	}

	stat, err := file.Stat()
	if err != nil {
		file.Close()
		return nil, fileInfo{}, err
	}

	if size := stat.Size(); size > MaxImageSize {
		cd.Log(slog.LevelWarn, "file too large", "size", size, "maxsize", MaxImageSize)
		file.Close()
		return nil, fileInfo{}, newFileError(http.StatusRequestEntityTooLarge, "file too large")
	}

	data, err := io.ReadAll(file)
	file.Close()
	if err != nil {
		return nil, fileInfo{}, err
	}

	return data, info, nil
}

func (db *Database) CommitFile(ctx context.Context, uuid string) (string, int32, error) {
	if uuid == "" {
		return "", 0, fmt.Errorf("got empty uuid")
	}

	// Check metadata
	meta, err := db.readMetaFile(ctx, db.TmpRoot, uuid)
	if err != nil {
		return "", 0, err
	}

	// Compute SHA256 hash of file
	hash, err := db.Sha256File(ctx, db.TmpRoot, uuid, meta.FileName)
	if err != nil {
		slog.ErrorContext(ctx, "Couldn't compute file hash", "err", err, "uuid", uuid, "filename", meta.FileName)
		hash = nil
	}

	// Lookup duplicate
	if prev, err := db.Q.GetFileBySizeAndHash(ctx, sql.GetFileBySizeAndHashParams{
		Size:   meta.Size,
		Sha256: hash,
	}); err == nil {
		slog.InfoContext(ctx, "Found duplicate", "uuid", uuid)
		return prev.Filename, prev.ID, nil
	}

	// Move the file over
	tmpDir := db.tmpDirectory + "/" + uuid
	mainDir := db.mainDirectory + "/" + uuid
	if err := os.Rename(tmpDir, mainDir); err != nil {
		return "", 0, err
	}
	fileID, err := db.Q.PublishFile(ctx, sql.PublishFileParams{
		Uuid:     uuid,
		Created:  pgtype.Timestamptz{Time: time.Now(), Valid: true},
		Filename: meta.FileName,
		Mimetype: meta.MIMEType,
		Size:     meta.Size,
		Sha256:   hash,
	})

	if err != nil {
		return meta.FileName, 0, err
	}
	return meta.FileName, fileID, err
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
