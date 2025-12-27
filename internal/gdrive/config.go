package gdrive

import "github.com/fugleadvokatene/bino/internal/gdrive/document"

type Config struct {
	ServiceAccountKeyLocation string
	DriveBase                 string
	JournalFolder             string
	TemplateFile              string
	ExtraJournalFolders       []string
}

type ConfigInfo struct {
	JournalFolder Item
	TemplateItem  Item
	TemplateDoc   document.Document
	ExtraFolders  []Item
}
