package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func (db *Database) EmailToUserMapping(ctx context.Context) (map[string]model.User, error) {
	users, err := db.Q.GetAppusers(ctx)
	if err != nil {
		return nil, err
	}
	return generic.SliceToMap(users, func(user sql.GetAppusersRow) (string, model.User) {
		return user.Email, user.ToUserView()
	}), nil
}
