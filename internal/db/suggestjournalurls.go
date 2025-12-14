package db

import (
	"context"
	"fmt"
	"log"
	"log/slog"

	"github.com/fugleadvokatene/bino/internal/gdrive/url"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

func (db *Database) SuggestJournalURLs(ctx context.Context, systemLanguage model.LanguageID) (int64, error) {
	missing, err := db.Q.GetActivePatientsMissingJournal(ctx, int32(systemLanguage))
	if err != nil {
		return 0, fmt.Errorf("looking up patients: %w", err)
	}
	log.Printf("there are %d active patients missing journals", len(missing))

	n := int64(0)
	for _, row := range missing {
		err := db.SuggestJournalBasedOnSearch(ctx, row.ID, row.Name, row.Species, row.CurrHomeID.Int32)
		if err != nil {
			slog.Warn("couldn't suggest journal", "name", row.Name, "err", err)
			continue
		} else {
			n += 1
		}
	}
	return n, nil
}

func (db *Database) SuggestJournalBasedOnSearch(ctx context.Context, id int32, name, speciesName string, homeID int32) error {
	searchQuery := name + " " + speciesName
	if home, err := db.Q.GetHome(ctx, homeID); err != nil {
		searchQuery += " " + home.Name
	}
	params := NewBasicSearchParams(SearchQuery{Query: searchQuery})
	params.Limit = 1
	results, err := db.Q.SearchBasic(ctx, params)
	if err != nil {
		return err
	} else if len(results) == 0 {
		return fmt.Errorf("no results")
	} else if baseURL := url.JournalRegex.FindString(results[0].AssociatedUrl.String); baseURL != "" {
		return db.Q.SuggestJournal(ctx, sql.SuggestJournalParams{
			Url:   pgtype.Text{String: baseURL, Valid: true},
			Title: pgtype.Text{String: results[0].Header.String, Valid: true},
			ID:    id,
		})
	} else {
		return fmt.Errorf("invalid journal URL '%s'", results[0].AssociatedUrl.String)
	}
}
