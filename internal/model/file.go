package model

import (
	"fmt"
	"path/filepath"
	"strings"
	"time"

	"github.com/a-h/templ"
)

type File struct {
	ID                   int32
	UUID                 string
	Created              time.Time
	OriginalFilename     string
	PresentationFilename string
	MIMEType             string
	Size                 int64
	SHA256               []byte
	WikiAssociations     []FileWikiAssociation
	PatientAssociations  []FilePatientAssociation
	ImageVariants        []ImageVariant
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

func (in *File) ImgSrcset() string {
	srcs := make([]string, len(in.ImageVariants))
	for i, variant := range in.ImageVariants {
		srcs[i] = fmt.Sprintf(
			"%s?variant=%s %dw",
			FileURL(in.ID, variant.Filename),
			variant.VariantID.String(),
			variant.Width,
		)
	}
	return strings.Join(srcs, ", ")
}

func (in *File) ImgSizes() string {
	sizes := make([]string, len(in.ImageVariants))
	for i, variant := range in.ImageVariants {
		sizes[i] = fmt.Sprintf(
			"%dpx",
			variant.Width,
		)
	}
	return strings.Join(sizes, ", ")
}

func (in *File) EditPresentationFilenameURL() string {
	return fmt.Sprintf("/file/%d/set-filename", in.ID)
}

func (in *File) FileSizeText() string {
	return FileSizeText(in.Size)
}

func FileSizeText(s int64) string {
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

// ---- File/Wiki association

type FileWikiAssociation struct {
	FileID    int32
	WikiID    int32
	WikiTitle string
}

func (fwa *FileWikiAssociation) WikiURL() templ.SafeURL {
	return templ.URL(fmt.Sprintf("/wiki/view/%d", fwa.WikiID))
}

// ---- File/Patient association

type FilePatientAssociation struct {
	FileID      int32
	PatientID   int32
	PatientName string
}

func (fpa *FilePatientAssociation) PatientURL() templ.SafeURL {
	return templ.SafeURL(PatientURL(fpa.PatientID))
}
