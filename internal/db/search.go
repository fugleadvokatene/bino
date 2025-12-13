package db

import (
	"fmt"
	"time"

	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/view"
	"github.com/jackc/pgx/v5/pgtype"
)

const (
	PageSize = int32(20)
)

type SearchQuery struct {
	Mode           string
	Query          string
	TimePreference enums.TimePreference
	Page           int32
	MinCreated     int64
	MaxCreated     int64
	MinUpdated     int64
	MaxUpdated     int64
	DebugRank      bool
}

type SearchSkipInfo struct {
	Reason string
}

type SearchJournalInfo struct {
	FolderURL  string
	FolderName string
}

func (sji *SearchJournalInfo) IndexableText() string {
	return fmt.Sprintf(`

FolderName = %s

`, sji.FolderName)
}

type SearchPatientInfo struct {
	JournalInfo SearchJournalInfo
	JournalURL  string
}

func (spi *SearchPatientInfo) IndexableText() string {
	return spi.JournalInfo.IndexableText()
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
	case enums.TimePreferenceNewer:
		wRecency = 3.0
	case enums.TimePreferenceOlder:
		wRecency = -3.0
	case enums.TimePreferenceNone:
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
		MinCreated:          pgtype.Timestamptz{Time: time.Unix(q.MinCreated, 0), Valid: q.MinCreated > 0},
		MaxCreated:          pgtype.Timestamptz{Time: time.Unix(q.MaxCreated, 0), Valid: q.MaxCreated > 0},
		MinUpdated:          pgtype.Timestamptz{Time: time.Unix(q.MinUpdated, 0), Valid: q.MinUpdated > 0},
		MaxUpdated:          pgtype.Timestamptz{Time: time.Unix(q.MaxUpdated, 0), Valid: q.MaxUpdated > 0},
	}
}

type SearchResult struct {
	Query        SearchQuery
	PageMatches  []view.Match
	Offset       int32
	TotalMatches int32
	Milliseconds int
}
