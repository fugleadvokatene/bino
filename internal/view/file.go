package view

import (
	"fmt"
	"path/filepath"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/enums"
)

type FileInfo struct {
	FileName string
	MIMEType string
	Size     int64
	Created  time.Time
	Creator  int32
}

type File struct {
	ID                   int32
	UUID                 string
	Creator              int32
	Accessibility        enums.FileAccessibility
	Created              time.Time
	OriginalFilename     string
	PresentationFilename string
	MIMEType             string
	Size                 int64
	WikiLinks            []WikiLink
	PatientLinks         []Patient
}

func (in *File) FileInfo() FileInfo {
	return FileInfo{
		FileName: in.OriginalFilename,
		MIMEType: in.MIMEType,
		Size:     in.Size,
		Created:  in.Created,
		Creator:  in.Creator,
	}
}

func (in *File) IsImage() bool {
	return strings.HasPrefix(in.MIMEType, "image/")
}

func (in *File) IsVideo() bool {
	return strings.HasPrefix(in.MIMEType, "video/")
}

func (in *File) IsAudio() bool {
	return strings.HasPrefix(in.MIMEType, "audio/")
}

func (in *File) IsPDF() bool {
	return in.MIMEType == "application/pdf"
}

func (in *File) Extension() string {
	return filepath.Ext(in.PresentationFilename)
}

func FileURL(id int32, filename string) string {
	return fmt.Sprintf("/file/%d/%s", id, filename)
}

func (in *File) URL() string {
	return FileURL(in.ID, in.PresentationFilename)
}

func (in *File) EditPresentationFilenameURL() string {
	return fmt.Sprintf("/file/%d/set-filename", in.ID)
}

func (in *File) FileSizeText() string {
	s := in.Size
	if s < 1000 {
		return fmt.Sprintf("%d B", s)
	}
	if s /= 1000; s < 1000 {
		return fmt.Sprintf("%d kB", s)
	}
	if s /= 1000; s < 1000 {
		return fmt.Sprintf("%d MB", s)
	}
	s /= 1000
	return fmt.Sprintf("%d GB", s)
}
