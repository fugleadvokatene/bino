package gdrive

import googledocs "google.golang.org/api/docs/v1"

type Config struct {
	ServiceAccountKeyLocation string
	DriveBase                 string
	ExtraJournalFolders       []string
	// JournalEditDebugDir, when non-empty, causes EditJournal to write
	// debugging artifacts (live doc, edited doc, patch requests, errors)
	// into that directory. Each attempt gets its own timestamped subdirectory.
	JournalEditDebugDir string
}

type ConfigInfo struct {
	DivisionConfigs []DivisionConfig
	ExtraFolders    []Item
}

type DivisionConfig struct {
	DivisionID    int32
	JournalFolder Item
	TemplateItem  Item
	TemplateDoc   *googledocs.Document
}
