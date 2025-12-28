-- +migrate Up
ALTER TABLE journal ADD COLUMN origin SMALLINT NOT NULL DEFAULT 0;
ALTER TABLE journal ADD COLUMN parent_google_id TEXT NULL;
