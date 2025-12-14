package db

import (
	"context"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func (db *Database) GetFeatureFlagsForUser(ctx context.Context, user int32) (generic.Set[string], error) {
	if flags, err := db.Q.GetFeatureFlagsForUser(ctx, user); err != nil {
		return nil, err
	} else {
		return generic.SliceToSet(flags, func(in sql.FeatureFlag) string {
			return in.Flag
		}), nil
	}
}

func (db *Database) SetFeatureFlagForUser(ctx context.Context, user int32, flag string) error {
	return db.Q.SetFeatureFlagForUser(ctx, sql.SetFeatureFlagForUserParams{
		Flag:      flag,
		AppuserID: user,
	})
}

func (db *Database) ClearFeatureFlagForUser(ctx context.Context, user int32, flag string) error {
	return db.Q.ClearFeatureFlagForUser(ctx, sql.ClearFeatureFlagForUserParams{
		Flag:      flag,
		AppuserID: user,
	})
}

func (db *Database) CreateFeatureFlag(ctx context.Context, flag string) error {
	return db.Q.CreateFeatureFlag(ctx, flag)
}

func (db *Database) DeleteFeatureFlag(ctx context.Context, flag string) error {
	return db.Q.DeleteFeatureFlag(ctx, flag)
}

func (db *Database) FeatureFlags(ctx context.Context) (*model.FeatureFlagsState, error) {
	rows, err := db.Q.GetAllFeatureFlags(ctx)
	if err != nil {
		return nil, err
	}

	result := &model.FeatureFlagsState{}
	var current *model.FeatureFlagState
	for _, r := range rows {
		if current == nil || current.Flag != r.Flag {
			current = &model.FeatureFlagState{
				Flag: r.Flag,
			}
			result.Flags = append(result.Flags, *current)
			current = &result.Flags[len(result.Flags)-1]
		}

		current.Users = append(current.Users, model.FeatureFlagUserState{
			UserID:   r.ID,
			UserName: r.DisplayName,
			Enabled:  r.IsSet,
		})
	}

	return result, nil
}
