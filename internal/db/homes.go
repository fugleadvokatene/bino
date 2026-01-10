package db

import (
	"context"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/model"
)

func (db *Database) Homes(ctx context.Context) ([]model.Home, error) {
	homesRaw, err := db.Q.GetHomes(ctx)
	return model.SliceToModel(homesRaw), err
}

func (db *Database) GetHome(ctx context.Context, id int32) (model.Home, error) {
	homeRaw, err := db.Q.GetHome(ctx, id)
	if err != nil {
		return model.Home{}, err
	}
	division, err := db.Q.GetHomeDivision(ctx, id)
	if err != nil {
		return model.Home{}, fmt.Errorf("getting division: %w", err)
	}
	home := homeRaw.ToModel()
	home.DivisionName = division.Name.String
	return home, nil
}
