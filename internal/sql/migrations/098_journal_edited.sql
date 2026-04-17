-- +migrate Up
ALTER TABLE journal ADD COLUMN edited_json JSONB;
