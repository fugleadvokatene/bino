-- +migrate Up
DROP FUNCTION search_match_advanced(
    s            search,
    tsq          tsquery,
    query        text,
    simthreshold real,
    min_created  timestamptz,
    max_created  timestamptz,
    min_updated  timestamptz,
    max_updated  timestamptz
);
DROP FUNCTION search_match_basic(
    s   search,
    tsq tsquery
);
DROP TABLE search CASCADE;
