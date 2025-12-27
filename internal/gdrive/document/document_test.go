package document

import (
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
	txtText, err := dir.ReadFile("test.txt")
	if err != nil {
		t.Fatalf("reading test.txt: %v", err)
	}
	mdText, err := dir.ReadFile("test.md")
	if err != nil {
		t.Fatalf("reading test.md: %v", err)
	}
	htmlText, err := dir.ReadFile("test.html")
	if err != nil {
		t.Fatalf("reading test.html: %v", err)
	}

	var doc Document
	if err := json.Unmarshal(jsonText, &doc); err != nil {
		t.Fatalf("unmarshalling test doc: %v", err)
	}

	var txtBuffer strings.Builder
	doc.IndexableText(&txtBuffer)
	dir.WriteFile("actual.txt", []byte(txtBuffer.String()), 0600)
	if s := strings.TrimSpace(txtBuffer.String()); s != strings.TrimSpace(string(txtText)) {
		t.Fatal("incorrect IndexableText, if the expected output has changed please copy actual.txt to test.txt", string(txtText), s)
	}

	var mdBuffer strings.Builder
	doc.Markdown(&mdBuffer)
	dir.WriteFile("actual.md", []byte(mdBuffer.String()), 0600)
	if s := strings.TrimSpace(mdBuffer.String()); s != strings.TrimSpace(string(mdText)) {
		t.Fatal("incorrect Markdown, if the expected output has changed please copy actual.md to test.md", string(mdText), s)
	}

	var htmlBuffer strings.Builder
	doc.Templ().Render(ctx, &htmlBuffer)
	dir.WriteFile("actual.html", []byte(htmlBuffer.String()), 0600)
	if s := strings.TrimSpace(htmlBuffer.String()); s != strings.TrimSpace(string(htmlText)) {
		t.Fatal("incorrect HTML, if the expected output has changed please copy actual.html to test.html", string(htmlText), s)
	}
}
