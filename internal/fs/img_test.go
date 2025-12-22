package fs

import (
	"os"
	"path/filepath"
	"runtime"
	"testing"

	"github.com/fugleadvokatene/bino/internal/model"
)

func TestConvertImage_AllSizes(t *testing.T) {
	_, file, _, ok := runtime.Caller(0)
	if !ok {
		t.Fatal("cannot resolve test file path")
	}

	base := filepath.Join(filepath.Dir(file), "test")
	orig := filepath.Join(base, "mascot.jpg")

	sizes := []model.ImageSize{
		model.ImageSizeSmall,
		model.ImageSizeMedium,
		model.ImageSizeLarge,
	}
	paths := make([]string, 0, len(sizes))
	for _, size := range sizes {
		path := filepath.Join(base, "mascot-"+size.String()+".jpg")
		os.Remove(path)
		paths = append(paths, path)
	}

	for i, size := range sizes {
		err := ConvertImage(orig, size)
		if err != nil {
			t.Fatalf("ConvertImage failed for size %s: %v", size, err)
		}

		if _, err := os.Stat(paths[i]); err != nil {
			t.Fatalf("output image not found for size %s: %v", size, err)
		}
	}
}
