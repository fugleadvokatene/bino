package db

import (
	"context"
	"crypto/sha256"
	"errors"
	"fmt"
	"image"
	"io"
	"math"
	"os"
	"path"
	"strings"

	// Register supported image formats
	_ "image/gif"
	"image/jpeg"
	_ "image/png"

	_ "golang.org/x/image/webp" // decode only

	"github.com/disintegration/gift"
	"github.com/fugleadvokatene/bino/internal/model"
)

const (
	AreaSmall  = 64.0 * 64.0
	AreaMedium = 400.0 * 400.0
	AreaLarge  = 800.0 * 800.0
)

// Must be in increasing order of size.
var miniatureVariants = []model.FileVariantID{model.FileVariantIDSmall, model.FileVariantIDMedium, model.FileVariantIDLarge}

var ErrImageTooSmall = errors.New("image too small to downscale")

type Miniature struct {
	Original        string
	VariantFilename string
	Variant         model.FileVariantID
	MimeType        string
	Size            int32
	Width           int32
	Height          int32
}

func WithFileDir[T any](ctx context.Context, dir *os.Root, uuid string, f func(context.Context, *os.Root) (T, error)) (T, error) {
	if dir == nil {
		return *new(T), fmt.Errorf("called WithFileDir on nil dir")
	}
	subdir, err := dir.OpenRoot(uuid)
	if err != nil {
		return *new(T), fmt.Errorf("no subdirectory named '%s' in main directory: %w", uuid, err)
	}
	defer subdir.Close()

	return f(ctx, subdir)
}

func (db *Database) CreateMiniatures(ctx context.Context, uuid string, originalFilename string) ([]Miniature, error) {
	return WithFileDir(ctx, db.MainRoot, uuid, func(ctx context.Context, subdir *os.Root) ([]Miniature, error) {
		return CreateMiniatures(ctx, subdir, originalFilename)
	})
}

func (db *Database) Sha256File(ctx context.Context, dir *os.Root, uuid string, filename string) ([]byte, error) {
	return WithFileDir(ctx, dir, uuid, func(ctx context.Context, subdir *os.Root) ([]byte, error) {
		file, err := subdir.Open(filename)
		if err != nil {
			return nil, fmt.Errorf("opening file: %w", err)
		}
		defer file.Close()

		h := sha256.New()
		if _, err := io.Copy(h, file); err != nil {
			return nil, err
		}
		return h.Sum(nil), nil
	})
}

func CreateMiniatures(
	ctx context.Context,
	dir *os.Root,
	originalFilename string,
) ([]Miniature, error) {
	file, err := dir.Open(originalFilename)
	if err != nil {
		return nil, fmt.Errorf("opening original file: %w", err)
	}
	defer file.Close()

	img, _, err := image.Decode(file)
	if err != nil {
		return nil, fmt.Errorf("decoding original image: %w", err)
	}

	var created []Miniature
	for _, variant := range miniatureVariants {
		var mini Miniature
		if mini, err = DownscaleImage(ctx, dir, originalFilename, img, variant); err != nil {
			break
		} else {
			created = append(created, mini)
		}
	}
	if errors.Is(err, ErrImageTooSmall) {
		err = nil
	}
	return created, err
}

func DownscaleImage(
	ctx context.Context,
	dir *os.Root,
	originalFilename string,
	img image.Image,
	variant model.FileVariantID,
) (Miniature, error) {
	// Validate inputs
	if !variant.IsMiniature() {
		return Miniature{}, fmt.Errorf("unsupported variant '%s'", variant)
	}

	// Compute new size based on original size and target area
	rect := img.Bounds()
	origWidth := float64(rect.Dx())
	origHeight := float64(rect.Dy())
	origArea := origWidth * origHeight
	if origArea < 1.0 {
		return Miniature{}, fmt.Errorf("image has no pixels")
	}
	var scaleFactor float64
	switch variant {
	case model.FileVariantIDLarge:
		scaleFactor = math.Sqrt(AreaLarge / origArea)
	case model.FileVariantIDMedium:
		scaleFactor = math.Sqrt(AreaMedium / origArea)
	case model.FileVariantIDSmall:
		scaleFactor = math.Sqrt(AreaSmall / origArea)
	default:
		return Miniature{}, fmt.Errorf("unknown size '%s'", variant)
	}
	if scaleFactor > 1.0 {
		return Miniature{}, ErrImageTooSmall
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
	newName := ImageVariantPath(originalFilename, variant)
	out, err := dir.Create(newName)
	if err != nil {
		return Miniature{}, fmt.Errorf("failed to create target destination '%s': %w", newName, err)
	}
	err = jpeg.Encode(out, resizedImg, &jpeg.Options{
		Quality: 85,
	})
	out.Close()
	if err != nil {
		return Miniature{}, fmt.Errorf("failed to encode resized image as jpeg: %w", err)
	}
	info, err := dir.Stat(newName)
	if err != nil {
		return Miniature{}, fmt.Errorf("stat-ing created file: %w", err)
	}

	mini := Miniature{
		Original:        originalFilename,
		VariantFilename: newName,
		Variant:         variant,
		MimeType:        "image/jpeg",
		Size:            int32(info.Size()),
		Width:           int32(newWidth),
		Height:          int32(newHeight),
	}

	return mini, nil
}

func ImageVariantPath(orig string, variant model.FileVariantID) string {
	if variant.IsMiniature() {
		return strings.TrimSuffix(orig, path.Ext(orig)) + "-" + variant.String() + ".jpg"
	}
	return orig
}
