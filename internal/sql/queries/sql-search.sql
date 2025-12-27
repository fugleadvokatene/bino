-- name: DeleteJournal :exec
DELETE
FROM journal
WHERE google_id = @google_id
;

-- name: GetJournalUpdatedTime :one
SELECT updated
FROM journal
WHERE google_id = @google_id
;

-- name: SearchBasic :many
WITH q AS (
  SELECT websearch_to_tsquery(sqlc.arg('lang')::regconfig, sqlc.arg('query')::text) AS qry
)
SELECT
  i.*,
  (
      i.r_fts_header
    + i.r_fts_body
  )::real AS rank
FROM (
  SELECT
    (sqlc.arg('w_fts_header')::real   * ts_rank(s.fts_header, q.qry))::real AS r_fts_header,
    (sqlc.arg('w_fts_body')::real     * ts_rank(s.fts_body,   q.qry))::real AS r_fts_body,
    ts_headline(sqlc.arg('lang')::regconfig, s.header, q.qry, 'StartSel=[START],StopSel=[STOP],HighlightAll=true')::text AS header_headline,
    ts_headline(sqlc.arg('lang')::regconfig, s.body,   q.qry, 'StartSel=[START],StopSel=[STOP],MaxFragments=5,MinWords=3,MaxWords=10,FragmentDelimiter=[CUT]')::text AS body_headline,
    s.header,
    s.google_id,
    s.updated
  FROM journal s
  CROSS JOIN q
  WHERE journal_match_basic(s, q.qry)
) i
ORDER BY rank DESC
LIMIT sqlc.arg('limit')
OFFSET sqlc.arg('offset')
;

-- name: SearchBasicCount :one
WITH q AS (
  SELECT websearch_to_tsquery(sqlc.arg('lang')::regconfig, sqlc.arg('query')::text) AS qry
)
SELECT COUNT(*)::int AS n
FROM journal s
CROSS JOIN q
WHERE journal_match_basic(s, q.qry)
;

-- name: SearchAdvanced :many
WITH q AS (
  SELECT websearch_to_tsquery(sqlc.arg('lang')::regconfig, sqlc.arg('query')::text) AS qry
)
SELECT
  i.*,
  (
      i.r_fts_header
    + i.r_fts_body
    + i.r_sim_header
    + i.r_sim_body
    + i.r_ilike_header
    + i.r_ilike_body
    + i.r_recency
  )::real AS rank
FROM (
  SELECT
    s.google_id,
    (sqlc.arg('w_fts_header')::real   * ts_rank(s.fts_header, q.qry))::real AS r_fts_header,
    (sqlc.arg('w_fts_body')::real     * ts_rank(s.fts_body,   q.qry))::real AS r_fts_body,
    (sqlc.arg('w_sim_header')::real   * f.sim_header)::real                 AS r_sim_header,
    (sqlc.arg('w_sim_body')::real     * f.sim_body)::real                   AS r_sim_body,
    (sqlc.arg('w_ilike_header')::real * f.ilike_header)::real               AS r_ilike_header,
    (sqlc.arg('w_ilike_body')::real   * f.ilike_body)::real                 AS r_ilike_body,
    (sqlc.arg('w_recency')::real      * f.recency)::real                    AS r_recency,
    COALESCE(s.header, '') AS header,
    COALESCE(s.body, '') AS body,
    ts_headline(sqlc.arg('lang')::regconfig, s.header, q.qry, 'StartSel=[START],StopSel=[STOP],HighlightAll=true')::text AS header_headline,
    ts_headline(sqlc.arg('lang')::regconfig, s.body,   q.qry, 'StartSel=[START],StopSel=[STOP],MaxFragments=5,MinWords=3,MaxWords=10,FragmentDelimiter=[CUT]')::text AS body_headline,
    s.updated
  FROM journal s
  CROSS JOIN q
  CROSS JOIN LATERAL (
    SELECT
      similarity(lower(s.header), lower(sqlc.arg('query'))) AS sim_header,
      similarity(lower(s.body),   lower(sqlc.arg('query'))) AS sim_body,
      CASE WHEN s.header ILIKE ('%' || sqlc.arg('query') || '%') THEN 1 ELSE 0 END AS ilike_header,
      CASE WHEN s.body   ILIKE ('%' || sqlc.arg('query') || '%') THEN 1 ELSE 0 END AS ilike_body,
      exp(
        - GREATEST(0, EXTRACT(EPOCH FROM (now() - s.created))) /
          (sqlc.arg('recency_half_life_days')::real * 86400.0)
      ) AS recency
  ) f
  WHERE journal_match_advanced(
    s,
    q.qry,
    sqlc.arg('query'),
    sqlc.arg('simthreshold')::real,
    sqlc.narg('min_updated')::timestamptz,
    sqlc.narg('max_updated')::timestamptz
  )
) i
ORDER BY rank DESC
LIMIT sqlc.arg('limit')
OFFSET sqlc.arg('offset')
;

-- name: SearchAdvancedCount :one
WITH q AS (
  SELECT websearch_to_tsquery(sqlc.arg('lang')::regconfig, sqlc.arg('query')::text) AS qry
)
SELECT COUNT(*)::int AS n
FROM journal s
CROSS JOIN q
WHERE journal_match_advanced(
  s,
  q.qry,
  sqlc.arg('query'),
  sqlc.arg('simthreshold')::real,
  sqlc.narg('min_updated')::timestamptz,
  sqlc.narg('max_updated')::timestamptz
);

-- name: DeleteSearchEntriesByGoogleID :exec
DELETE FROM journal
WHERE google_id = @google_id
;