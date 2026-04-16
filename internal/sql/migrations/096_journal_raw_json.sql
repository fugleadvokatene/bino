-- +migrate Up
ALTER TABLE journal RENAME COLUMN json TO raw_json;
ALTER TABLE journal ADD COLUMN image_urls JSONB NOT NULL DEFAULT '{}';
ALTER TABLE journal DROP COLUMN markdown;
ALTER TABLE journal DROP COLUMN html;
