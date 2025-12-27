package db

import (
	"time"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

const (
	PageSize = int32(20)
)

type SearchQuery struct {
	Mode           string
	Query          string
	TimePreference model.TimePreference
	Page           int32
	MinUpdated     int64
	MaxUpdated     int64
	DebugRank      bool
}

func NewBasicSearchParams(q SearchQuery) sql.SearchBasicParams {
	return sql.SearchBasicParams{
		WFtsHeader: 1.0,
		WFtsBody:   1.0,
		Lang:       "norwegian",
		Offset:     q.Page * PageSize,
		Limit:      PageSize,
		Query:      q.Query,
	}
}

func NewSearchAdvancedParams(q SearchQuery) sql.SearchAdvancedParams {
	wRecency := float32(0.0)
	switch q.TimePreference {
	case model.TimePreferenceNewer:
		wRecency = 3.0
	case model.TimePreferenceOlder:
		wRecency = -3.0
	case model.TimePreferenceNone:
		wRecency = 0.0
	}

	return sql.SearchAdvancedParams{
		Lang:                "norwegian",
		Query:               q.Query,
		WFtsHeader:          10.0,
		WFtsBody:            10.0,
		WSimHeader:          0.4,
		WSimBody:            20.2,
		WIlikeHeader:        3,
		WIlikeBody:          1,
		WRecency:            wRecency,
		Simthreshold:        0.1,
		RecencyHalfLifeDays: 60,
		Offset:              q.Page * PageSize,
		Limit:               PageSize,
		MinUpdated:          pgtype.Timestamptz{Time: time.Unix(q.MinUpdated, 0), Valid: q.MinUpdated > 0},
		MaxUpdated:          pgtype.Timestamptz{Time: time.Unix(q.MaxUpdated, 0), Valid: q.MaxUpdated > 0},
	}
}

type SearchResult struct {
	Query        SearchQuery
	PageMatches  []model.Match
	Offset       int32
	TotalMatches int32
	Milliseconds int
}
