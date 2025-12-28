package url

import (
	"regexp"
)

var DriveBaseURL = "https://drive.google.com/drive/folders/"
var DocBaseURL = "https://docs.google.com/document/d/"
var JournalRegex = regexp.MustCompile(`(https:\/\/docs\.google\.com\/document\/d\/[^\/?#\n]+)`)
var DocumentIDRegex = regexp.MustCompile(`https:\/\/docs\.google\.com\/document\/d\/([^\/?#\n]+)`)

func IDToDocumentURL(id string) string {
	if id == "" {
		return ""
	}
	return DocBaseURL + id
}

func IDToFolderURL(id string) string {
	if id == "" {
		return ""
	}
	return DriveBaseURL + id
}
