package model

import "fmt"

type Division struct {
	ID   int32
	Name string

	// Optional
	Homes               []Home
	JournalFolderID     string
	JournalFolderName   string
	TemplateJournalID   string
	TemplateJournalName string
}

func (d *Division) URLSuffix(suffix string) string {
	return fmt.Sprintf("/homes/divisions/%d/%s", d.ID, suffix)
}
