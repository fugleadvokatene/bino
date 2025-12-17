package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/model"
)

func (db *Database) Homes(ctx context.Context) ([]model.Home, error) {
	homesRaw, err := db.Q.GetHomes(ctx)
	return model.SliceToModel(homesRaw), err
}
