-- +migrate Up
ALTER TABLE patient ADD COLUMN journal_pending BOOLEAN NOT NULL DEFAULT FALSE;

-- +migrate Down
