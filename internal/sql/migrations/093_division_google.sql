-- +migrate Up
ALTER TABLE division
    ADD COLUMN journal_folder_id TEXT,
    ADD COLUMN journal_folder_name TEXT,
    ADD COLUMN template_journal_id TEXT,
    ADD COLUMN template_journal_name TEXT
;
