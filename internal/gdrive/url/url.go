package url

import (
	"regexp"
)

var DocBaseURL = "https://docs.google.com/document/d/"
var JournalRegex = regexp.MustCompile(`(https:\/\/docs\.google\.com\/document\/d\/[^\/?#\n]+)`)
var DocumentIDRegex = regexp.MustCompile(`https:\/\/docs\.google\.com\/document\/d\/([^\/?#\n]+)`)

func IDToDocumentURL(id string) string {
	if id == "" {
		return ""
	}
	return DocBaseURL + id
}
