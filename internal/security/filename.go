package security

import (
	"path"
	"strings"
)

const (
	maxFilenameLen = 100
)

var mimeToExt = map[string]string{
	"image/jpeg": ".jpg",
	"image/png":  ".png",
	"image/gif":  ".gif",
	"image/webp": ".webp",
}

func SanitizeFilename(name string, mime string) string {
	name = path.Base(name)
	name = strings.TrimSpace(name)
	if name == "" || name == "." || name == "/" {
		name = "file"
	}

	var b strings.Builder
	for _, r := range name {
		if (r >= 'a' && r <= 'z') ||
			(r >= 'A' && r <= 'Z') ||
			(r >= '0' && r <= '9') ||
			r == '.' || r == '_' || r == '-' {
			b.WriteRune(r)
		}
	}

	out := b.String()
	if out == "" {
		out = "file"
	}

	if len(out) > maxFilenameLen {
		out = out[:maxFilenameLen]
	}

	ext := strings.ToLower(path.Ext(out))
	if ext == "" {
		if newExt, found := mimeToExt[mime]; found {
			out += newExt
		} else {
			out += ".img"
		}
	}

	return out
}
