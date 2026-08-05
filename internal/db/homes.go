package db

import (
	"context"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

func (db *Database) Homes(ctx context.Context, division int32) ([]model.Home, error) {
	var homesRaw []sql.Home
	var err error
	if division == 0 {
		homesRaw, err = db.Q.GetHomes(ctx)
	} else {
		homesRaw, err = db.Q.GetHomesInDivision(ctx, division)
	}
	if err != nil {
		return nil, err
	}

	homes := model.SliceToModel(homesRaw)

	allSettings, err := db.Q.GetAllHomeSettings(ctx)
	if err != nil {
		return nil, err
	}
	settingsByHome := make(map[int32]map[string]string)
	for _, s := range allSettings {
		if settingsByHome[s.HomeID] == nil {
			settingsByHome[s.HomeID] = make(map[string]string)
		}
		settingsByHome[s.HomeID][s.Key] = s.Value
	}
	for i := range homes {
		homes[i].Config = model.HomeConfigFromMap(settingsByHome[homes[i].ID])
	}

	return homes, nil
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
	settings, err := db.Q.GetHomeSettings(ctx, id)
	if err != nil {
		return model.Home{}, fmt.Errorf("getting settings: %w", err)
	}
	home := homeRaw.ToModel()
	home.DivisionName = division.Name.String
	home.Config = settingsToConfig(settings)
	return home, nil
}

func settingsToConfig(rows []sql.GetHomeSettingsRow) model.HomeConfig {
	m := make(map[string]string, len(rows))
	for _, r := range rows {
		m[r.Key] = r.Value
	}
	return model.HomeConfigFromMap(m)
}

func (db *Database) GetHomeConfig(ctx context.Context, homeID int32) (model.HomeConfig, error) {
	rows, err := db.Q.GetHomeSettings(ctx, homeID)
	if err != nil {
		return model.HomeConfig{}, err
	}
	return settingsToConfig(rows), nil
}

// ApplyPatientSort re-sorts a home's current patients according to its stored
// sort preference and persists the result as the patients' sort_order.
func (db *Database) ApplyPatientSort(ctx context.Context, homeID int32, languageID int32) error {
	cfg, err := db.GetHomeConfig(ctx, homeID)
	if err != nil {
		return err
	}

	rows, err := db.Q.GetCurrentPatientsForHome(ctx, sql.GetCurrentPatientsForHomeParams{
		CurrHomeID: pgtype.Int4{Int32: homeID, Valid: true},
		LanguageID: languageID,
	})
	if err != nil {
		return err
	}

	patients := model.SliceToModel(rows)
	model.SortPatients(patients, cfg.PatientSortField, cfg.PatientSortDirection)

	ids := make([]int32, len(patients))
	orders := make([]int32, len(patients))
	for i, p := range patients {
		ids[i] = p.ID
		orders[i] = int32(i)
	}

	return db.Q.UpdatePatientSortOrder(ctx, sql.UpdatePatientSortOrderParams{
		Ids:    ids,
		Orders: orders,
	})
}
