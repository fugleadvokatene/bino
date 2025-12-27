-- +migrate Up
ALTER TABLE patient RENAME COLUMN journal_url TO google_id;
ALTER TABLE patient RENAME COLUMN suggested_journal_url TO suggested_google_id;

UPDATE patient
SET google_id = substring(google_id FROM 'https://docs\.google\.com/document/d/([^/?#\n]+)'),
    suggested_google_id = substring(google_id FROM 'https://docs\.google\.com/document/d/([^/?#\n]+)')
;

