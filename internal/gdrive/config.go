package gdrive

import "github.com/fugleadvokatene/bino/internal/gdrive/document"

type Config struct {
	ServiceAccountKeyLocation string
	DriveBase                 string
	ExtraJournalFolders       []string
}

type ConfigInfo struct {
	DivisionConfigs []DivisionConfig
	ExtraFolders    []Item
}

type DivisionConfig struct {
	DivisionID    int32
	JournalFolder Item
	TemplateItem  Item
	TemplateDoc   document.Document
}
