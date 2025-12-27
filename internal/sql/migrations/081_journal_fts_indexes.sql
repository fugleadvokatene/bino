-- +migrate Up
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX journal_header_trgm ON journal
USING gin (lower(header) gin_trgm_ops);

CREATE INDEX journal_body_trgm ON journal
USING gin (lower(body) gin_trgm_ops);

CREATE INDEX journal_fts_header ON journal USING gin(fts_header);
CREATE INDEX journal_fts_body ON journal USING gin(fts_body);
