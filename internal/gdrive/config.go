package gdrive

type Config struct {
	ServiceAccountKeyLocation string
	DriveBase                 string
	JournalFolder             string
	TemplateFile              string
	ExtraJournalFolders       []string
}

type ConfigInfo struct {
	JournalFolder Item
	TemplateDoc   Journal
	ExtraFolders  []Item
}
