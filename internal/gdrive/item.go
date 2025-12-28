package gdrive

import (
	"time"

	"github.com/a-h/templ"
)

type Item struct {
	ID       string
	Name     string
	Valid    bool
	ParentID string

	// Optional
	Permissions  []Permission
	ModifiedTime time.Time
	Trashed      bool
	CreatedTime  time.Time
}

func GDriveFolderURL(id string) string {
	return "https://drive.google.com/drive/folders/" + id
}

func (item *Item) FolderURL() templ.SafeURL {
	return templ.URL(GDriveFolderURL(item.ID))
}

func (item *Item) DocumentURL() string {
	return "https://docs.google.com/document/d/" + item.ID
}
