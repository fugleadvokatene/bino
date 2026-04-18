-- +migrate Up
ALTER TABLE file ADD COLUMN original_deleted BOOL NOT NULL DEFAULT FALSE;
