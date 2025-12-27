-- +migrate Up
UPDATE journal
SET google_id = regexp_replace(
    google_id,
    '^https://docs\.google\.com/document/d/([^/?#\n]+).*$', 
    '\1'
)
WHERE google_id LIKE 'https://docs.google.com/document/d/%';
