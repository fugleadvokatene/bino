package fs

import (
	"fmt"
	"image"
	"os"
	"path"
	"strings"

	// Register supported image formats
	_ "image/gif"
	"image/jpeg"
	_ "image/jpeg"
	_ "image/png"

	_ "golang.org/x/image/webp" // decode only

	"github.com/disintegration/gift"
	"github.com/fugleadvokatene/bino/internal/model"
)

const (
	AreaSmall  = float32(64.0 * 64.0)
	AreaMedium = float32(400.0 * 400.0)
	AreaLarge  = float32(800.0 * 800.0)
)

func ConvertImage(
	originalPath string,
	size model.ImageSize,
) error {
	// Validate inputs
	if size == model.ImageSizeOriginal {
		return fmt.Errorf("pointless call to ConvertImage with size==Original")
	}

	// Decode image from original file
	in, err := os.Open(originalPath)
	if err != nil {
		return fmt.Errorf("opening '%s': %w", originalPath, err)
	}
	img, _, err := image.Decode(in)
	in.Close()
	if err != nil {
		return fmt.Errorf("decoding image: %w", err)
	}

	// Compute new size based on original size and target area
	rect := img.Bounds()
	origWidth := float32(rect.Dx())
	origHeight := float32(rect.Dy())
	origArea := origWidth * origHeight
	if origArea < 1.0 {
		return fmt.Errorf("image has no pixels")
	}
	var scaleFactor float32
	switch size {
	case model.ImageSizeLarge:
		scaleFactor = AreaLarge / origArea
	case model.ImageSizeMedium:
		scaleFactor = AreaMedium / origArea
	case model.ImageSizeSmall:
		scaleFactor = AreaLarge / origArea
	default:
		return fmt.Errorf("unknown size '%s'", size)
	}
	newWidth := origWidth * scaleFactor
	newHeight := origHeight * scaleFactor

	// Do the resizing operation
	filter := gift.New(
		gift.Resize(int(newWidth), int(newHeight), gift.LanczosResampling),
	)
	resizedImg := image.NewRGBA(filter.Bounds(img.Bounds()))
	filter.Draw(resizedImg, img)

	// Store resized image
	dir, filename := path.Split(originalPath)
	newPath := path.Join(dir, strings.TrimSuffix(filename, path.Ext(filename))+"-"+size.String())
	out, err := os.Create(newPath)
	if err != nil {
		return fmt.Errorf("failed to create target destination '%s': %w", newPath, err)
	}
	if err := jpeg.Encode(out, resizedImg, nil); err != nil {
		return fmt.Errorf("failed to encode resized image as jpeg: %w", err)
	}
	return nil
}
