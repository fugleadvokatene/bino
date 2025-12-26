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

	var txtBuffer bytes.Buffer
	doc.IndexableText(&txtBuffer)
	dir.WriteFile("actual.txt", txtBuffer.Bytes(), 0600)
	if s := strings.TrimSpace(txtBuffer.String()); s != strings.TrimSpace(string(txtText)) {
		t.Fatal("incorrect IndexableText, if the expected output has changed please copy actual.txt to test.txt", string(txtText), s)
	}

	var mdBuffer bytes.Buffer
	doc.Markdown(&mdBuffer)
	dir.WriteFile("actual.md", mdBuffer.Bytes(), 0600)
	if s := strings.TrimSpace(mdBuffer.String()); s != strings.TrimSpace(string(mdText)) {
		t.Fatal("incorrect Markdown, if the expected output has changed please copy actual.md to test.md", string(mdText), s)
	}

	var htmlBuffer bytes.Buffer
	doc.Templ().Render(ctx, &htmlBuffer)
	dir.WriteFile("actual.html", htmlBuffer.Bytes(), 0600)
	if s := strings.TrimSpace(htmlBuffer.String()); s != strings.TrimSpace(string(htmlText)) {
		t.Fatal("incorrect HTML, if the expected output has changed please copy actual.html to test.html", string(htmlText), s)
	}
}
