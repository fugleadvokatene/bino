package url

import "regexp"

var DocBaseURL = "https://docs.google.com/document/"
var JournalRegex = regexp.MustCompile(`(https:\/\/docs\.google\.com\/document\/d\/[^\/?#\n]+)`)
var DocumentIDRegex = regexp.MustCompile(`https:\/\/docs\.google\.com\/document\/d\/([^\/?#\n]+)`)
