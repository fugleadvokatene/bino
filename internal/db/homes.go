package db

import (
	"context"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func (db *Database) Homes(ctx context.Context, division int32) ([]model.Home, error) {
	var homesRaw []sql.Home
	var err error
	if division == 0 {
		homesRaw, err = db.Q.GetHomes(ctx)
	} else {
		homesRaw, err = db.Q.GetHomesInDivision(ctx, division)
	}

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
