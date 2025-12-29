package handlersearch

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	dblib "github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

func doSearch(r *http.Request, db *dblib.Database) (dblib.SearchResult, error) {
	ctx := r.Context()

	q, err := request.GetFormValue(r, "q")
	if err != nil {
		return dblib.SearchResult{}, err
	}
	if len(q) < 3 {
		return dblib.SearchResult{}, errors.New("too short")
	}
	formValues := request.GetOptionalFormValues(
		r,
		"mode",
		"page",
		"created-from",
		"created-to",
		"updated-from",
		"updated-to",
		"time-preference",
		"debug-rank",
	)

	mode := formValues["mode"]
	if mode == "" {
		mode = "basic"
	}
	page, err := strconv.Atoi(formValues["page"])
	if err != nil {
		page = 0
	}
	minUpdated, maxUpdated := int64(0), int64(0)
	if t, err := time.Parse(formValues["updated-from"], time.DateOnly); err == nil {
		minUpdated = t.Unix()
	}
	if t, err := time.Parse(formValues["updated-to"], time.DateOnly); err == nil {
		maxUpdated = t.Unix()
	}
	timePref, _ := model.ParseTimePreference(strings.TrimSpace(formValues["time-preference"]))
	query := dblib.SearchQuery{
		Query:          q,
		Mode:           mode,
		Page:           int32(page),
		TimePreference: timePref,
		MinUpdated:     minUpdated,
		MaxUpdated:     maxUpdated,
		DebugRank:      formValues["debug-rank"] != "",
	}

	var matches []model.Match
	var totalMatches int32
	var offset int32
	t0 := time.Now()
	if mode == "advanced" {
		searchParams := dblib.NewSearchAdvancedParams(query)
		rows, err := db.Q.SearchAdvanced(ctx, searchParams)
		if err != nil {
			return dblib.SearchResult{Query: query}, err
		}
		matches = generic.SliceToSlice(rows, func(in sql.SearchAdvancedRow) model.Match {
			return in.ToModel(q)
		})
		if searchParams.Offset > 0 || len(matches) >= int(searchParams.Limit) {
			totalMatches, err = db.Q.SearchAdvancedCount(ctx, sql.SearchAdvancedCountParams{
				Query:        query.Query,
				Simthreshold: searchParams.Simthreshold,
				Lang:         searchParams.Lang,
			})
			if err != nil {
				request.LogError(r, fmt.Errorf("counting: %w", err))
				totalMatches = int32(len(matches))
			}
		} else {
			totalMatches = int32(len(matches))
		}
		offset = searchParams.Offset
	} else {
		searchParams := dblib.NewBasicSearchParams(query)
		rows, err := db.Q.SearchBasic(ctx, searchParams)
		if err != nil {
			return dblib.SearchResult{Query: query}, err
		}
		matches = generic.SliceToSlice(rows, func(in sql.SearchBasicRow) model.Match {
			return in.ToModel()
		})
		if searchParams.Offset > 0 || len(matches) >= int(searchParams.Limit) {
			totalMatches, err = db.Q.SearchBasicCount(ctx, sql.SearchBasicCountParams{
				Query: query.Query,
				Lang:  searchParams.Lang,
			})
			if err != nil {
				request.LogError(r, fmt.Errorf("counting: %w", err))
				totalMatches = int32(len(matches))
			}
		} else {
			totalMatches = int32(len(matches))
		}
		offset = searchParams.Offset
	}

	// Attach file IDs to images
	googleIDs := generic.SliceToSlice(matches, func(in model.Match) string { return in.GoogleID })
	if files, err := db.Q.GetFilesMatchingJournals(ctx, googleIDs); err == nil {
		generic.GroupByID(
			matches,
			files,
			func(in *model.Match) string {
				return in.GoogleID
			},
			func(in *sql.GetFilesMatchingJournalsRow) string {
				return in.GoogleID
			},
			func(match *model.Match, fi *sql.GetFilesMatchingJournalsRow) {
				match.Images = append(match.Images, model.ImageInJournal{
					FileID:               fi.FileID,
					PresentationFilename: fi.PresentationFilename,
				})
			},
		)
	}

	elapsed := time.Since(t0)

	return dblib.SearchResult{
		Query:        query,
		PageMatches:  matches,
		TotalMatches: totalMatches,
		Offset:       offset,
		Milliseconds: int((elapsed + (time.Millisecond / 2)) / time.Millisecond),
	}, nil
}

func emptySearch(w http.ResponseWriter, r *http.Request, result db.SearchResult, msg string, fullPage bool) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	if fullPage {
		_ = SearchPage(commonData, result, msg).Render(ctx, w)
	} else {
		_ = SearchMatches(commonData, result, msg).Render(ctx, w)
	}
}
