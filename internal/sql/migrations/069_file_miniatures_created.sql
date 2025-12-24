-- +migrate Up
ALTER TABLE file ADD COLUMN miniatures_created BOOLEAN NOT NULL DEFAULT FALSE;