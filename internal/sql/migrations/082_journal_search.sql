-- +migrate Up
CREATE OR REPLACE FUNCTION journal_match_advanced(
    s            journal,
    tsq          tsquery,
    query        text,
    simthreshold real,
    min_updated  timestamptz,
    max_updated  timestamptz
)
RETURNS boolean
LANGUAGE sql
STABLE
AS $sma$
    SELECT (
           (tsq @@ s.fts_header)
        OR (tsq @@ s.fts_body)
        OR (s.header ILIKE ('%' || query || '%'))
        OR (s.body   ILIKE ('%' || query || '%'))
        OR (similarity(lower(s.header), lower(query)) > simthreshold)
        OR (similarity(lower(s.body),   lower(query)) > simthreshold)
    )
    AND (min_updated IS NULL OR s.updated >= min_updated)
    AND (max_updated IS NULL OR s.updated <= max_updated)
$sma$;

CREATE OR REPLACE FUNCTION journal_match_basic(
    s   journal,
    tsq tsquery
)
RETURNS boolean
LANGUAGE sql
STABLE
AS $smb$
    SELECT (
           (tsq @@ s.fts_header)
        OR (tsq @@ s.fts_body)
    )
$smb$;
