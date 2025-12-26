package document

import (
	"bytes"
	"context"
	"encoding/json"
	"log/slog"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
)

func TestDocument(t *testing.T) {
	ctx := context.Background()
	_ = ctx
	slog.SetLogLoggerLevel(slog.LevelDebug)

	_, file, _, ok := runtime.Caller(0)
	if !ok {
		t.Fatal("cannot resolve test file path")
	}

	base := filepath.Join(filepath.Dir(file), "test")
	dir, err := os.OpenRoot(base)
	if err != nil {
		t.Fatalf("opening root: %v", err)
	}
	jsonText, err := dir.ReadFile("test.json")
	if err != nil {
		t.Fatalf("reading test.json: %v", err)
	}
	mdText, err := dir.ReadFile("test.md")
	if err != nil {
		t.Fatalf("reading test.md: %v", err)
	}

	var doc Document
	if err := json.Unmarshal(jsonText, &doc); err != nil {
		t.Fatalf("unmarshalling test doc: %v", err)
	}

	var mdBuffer bytes.Buffer
	doc.Markdown(&mdBuffer)
	if s := strings.TrimSpace(mdBuffer.String()); s != strings.TrimSpace(string(mdText)) {
		t.Fatalf("incorrect markdown, want:\n\n%s\n\ngot:\n\n%s\n\n", string(mdText), s)
	}
}
