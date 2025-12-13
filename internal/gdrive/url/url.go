package url

import "regexp"

var JournalRegex = regexp.MustCompile(`(https:\/\/docs\.google\.com\/document\/d\/[^\/?#\n]+)`)
