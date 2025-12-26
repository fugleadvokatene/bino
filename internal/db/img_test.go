package db

import (
	"context"
	"log/slog"
	"os"
	"path/filepath"
	"runtime"
	"testing"
	"time"
)

func TestCreateMiniatures(t *testing.T) {
	ctx := context.Background()
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
	orig := "mascot.jpg"

	for _, variant := range miniatureVariants {
		os.Remove(ImageVariantPath(orig, variant))
	}

	var m1, m2 runtime.MemStats
	runtime.GC()
	runtime.ReadMemStats(&m1)
	start := time.Now()
	miniatures, err := CreateMiniatures(ctx, dir, orig)
	runtime.ReadMemStats(&m2)
	elapsed := time.Since(start)

	if err != nil {
		t.Fatalf("CreateMiniatures failed: %v", err)
	}

	slog.DebugContext(
		ctx,
		"Runtime stats",
		"miniatures", miniatures,
		"elapsed", elapsed,
		"peakAlloc", (m2.TotalAlloc-m1.TotalAlloc)/1024/1024,
	)
	for _, mini := range miniatures {
		if _, err := dir.Stat(mini.VariantFilename); err != nil {
			t.Fatalf("output image not found: %v", err)
		}
	}
}
