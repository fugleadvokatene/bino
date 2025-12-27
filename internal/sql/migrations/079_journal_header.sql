-- +migrate Up
ALTER TABLE journal ADD COLUMN header TEXT;
ALTER TABLE journal ADD COLUMN body TEXT;
ALTER TABLE journal ADD COLUMN lang regconfig;
ALTER TABLE journal ADD COLUMN fts_header tsvector GENERATED ALWAYS AS (setweight(to_tsvector(lang, COALESCE(header, '')), 'A')) stored;
ALTER TABLE journal ADD COLUMN fts_body tsvector GENERATED ALWAYS AS (setweight(to_tsvector(lang, COALESCE(body, '')), 'C')) stored;
