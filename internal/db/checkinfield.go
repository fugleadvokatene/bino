package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/model"
)

func (db *Database) GetCheckinFields(ctx context.Context) ([]model.CheckinField, error) {
	rows, err := db.Q.GetCheckinFields(ctx)
	if err != nil {
		return nil, err
	}
	return model.SliceToModel(rows), nil
}
