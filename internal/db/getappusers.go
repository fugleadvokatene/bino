package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/view"
)

func (db *Database) EmailToUserMapping(ctx context.Context) (map[string]view.User, error) {
	users, err := db.Q.GetAppusers(ctx)
	if err != nil {
		return nil, err
	}
	return generic.SliceToMap(users, func(user sql.GetAppusersRow) (string, view.User) {
		return user.Email, user.ToUserView()
	}), nil
}
