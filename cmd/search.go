package main

import (
	"errors"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/view"
)

func (server *Server) doSearch(r *http.Request) (db.SearchResult, error) {
	q, err := request.GetFormValue(r, "q")
	if err != nil {
		return db.SearchResult{}, err
	}
	if len(q) < 3 {
		return db.SearchResult{}, errors.New("too short")
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
	minCreated, maxCreated, minUpdated, maxUpdated := int64(0), int64(0), int64(0), int64(0)
	if t, err := time.Parse(formValues["created-from"], time.DateOnly); err == nil {
		minCreated = t.Unix()
	}
	if t, err := time.Parse(formValues["created-to"], time.DateOnly); err == nil {
		maxCreated = t.Unix()
	}
	if t, err := time.Parse(formValues["updated-from"], time.DateOnly); err == nil {
		minUpdated = t.Unix()
	}
	if t, err := time.Parse(formValues["updated-to"], time.DateOnly); err == nil {
		maxUpdated = t.Unix()
	}
	timePref, _ := enums.ParseTimePreference(strings.TrimSpace(formValues["time-preference"]))
	query := db.SearchQuery{
		Query:          q,
		Mode:           mode,
		Page:           int32(page),
		TimePreference: timePref,
		MinCreated:     minCreated,
		MaxCreated:     maxCreated,
		MinUpdated:     minUpdated,
		MaxUpdated:     maxUpdated,
		DebugRank:      formValues["debug-rank"] != "",
	}

	var matches []view.Match
	var totalMatches int32
	var offset int32
	t0 := time.Now()
	if mode == "advanced" {
		searchParams := db.NewSearchAdvancedParams(query)
		rows, err := server.DB.Q.SearchAdvanced(r.Context(), searchParams)
		if err != nil {
			return db.SearchResult{Query: query}, err
		}
		matches = generic.SliceToSlice(rows, func(in sql.SearchAdvancedRow) view.Match {
			return in.ToMatchView(q)
		})
		if searchParams.Offset > 0 || len(matches) >= int(searchParams.Limit) {
			totalMatches, err = server.DB.Q.SearchAdvancedCount(r.Context(), sql.SearchAdvancedCountParams{
				Query:        query.Query,
				Simthreshold: searchParams.Simthreshold,
				Lang:         searchParams.Lang,
			})
			if err != nil {
				request.LogR(r, "counting: %s", err.Error())
				totalMatches = int32(len(matches))
			}
		} else {
			totalMatches = int32(len(matches))
		}
		offset = searchParams.Offset
	} else {
		searchParams := db.NewBasicSearchParams(query)
		rows, err := server.DB.Q.SearchBasic(r.Context(), searchParams)
		if err != nil {
			return db.SearchResult{Query: query}, err
		}
		matches = generic.SliceToSlice(rows, func(in sql.SearchBasicRow) view.Match {
			return in.ToMatchView()
		})
		if searchParams.Offset > 0 || len(matches) >= int(searchParams.Limit) {
			totalMatches, err = server.DB.Q.SearchBasicCount(r.Context(), sql.SearchBasicCountParams{
				Query: query.Query,
				Lang:  searchParams.Lang,
			})
			if err != nil {
				request.LogR(r, "counting: %s", err.Error())
				totalMatches = int32(len(matches))
			}
		} else {
			totalMatches = int32(len(matches))
		}
		offset = searchParams.Offset
	}
	elapsed := time.Since(t0)

	return db.SearchResult{
		Query:        query,
		PageMatches:  matches,
		TotalMatches: totalMatches,
		Offset:       offset,
		Milliseconds: int((elapsed + (time.Millisecond / 2)) / time.Millisecond),
	}, nil
}

func (server *Server) emptySearch(w http.ResponseWriter, r *http.Request, result db.SearchResult, msg string, fullPage bool) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)
	if fullPage {
		_ = SearchPage(commonData, result, msg).Render(ctx, w)
	} else {
		_ = SearchMatches(commonData, result, msg).Render(ctx, w)
	}
}

func (server *Server) searchHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	commonData.Subtitle = commonData.Language.GenericSearch

	result, err := server.doSearch(r)
	if err != nil {
		server.emptySearch(w, r, result, err.Error(), true)
		return
	}
	_ = SearchPage(commonData, result, commonData.Language.GenericNotFound).Render(ctx, w)
}

func (server *Server) searchLiveHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	result, err := server.doSearch(r)
	if err != nil {
		server.emptySearch(w, r, result, err.Error(), false)
		return
	}
	_ = SearchMatches(commonData, result, commonData.Language.GenericNotFound).Render(ctx, w)
}
