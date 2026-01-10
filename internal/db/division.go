package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/model"
)

func (db *Database) GetDivisions(ctx context.Context) ([]model.Division, error) {
	sql, err := db.Q.GetDivisions(ctx)
	if err != nil {
		return nil, err
	}
	return model.SliceToModel(sql), nil
}
