-- +migrate Up
ALTER TABLE patient ADD COLUMN suggested_journal_url   TEXT NULL;
ALTER TABLE patient ADD COLUMN suggested_journal_title TEXT NULL;

-- +migrate Down
