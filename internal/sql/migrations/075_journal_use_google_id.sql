-- +migrate Up
ALTER TABLE journal
RENAME COLUMN google_url TO google_id;

UPDATE journal
SET google_id = substring(
    google_id
    FROM 'https://docs\.google\.com/document/d/([^/?#\n]+)'
);
