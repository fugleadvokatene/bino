package model

import (
	"fmt"

	"github.com/a-h/templ"
)

type ImageVariant struct {
	VariantID FileVariantID
	FileID    int32
	Filename  string
	Mimetype  string
	Size      int32
	Width     int32
	Height    int32
}

func (iv *ImageVariant) FileSizeText() string {
	return FileSizeText(int64(iv.Size))
}

func (iv *ImageVariant) URL(presentationFilename string) templ.SafeURL {
	if presentationFilename == "" {
		presentationFilename = iv.Filename
	}
	return templ.URL(fmt.Sprintf("/file/%d/%s?variant=%s", iv.FileID, presentationFilename, iv.VariantID))
}
