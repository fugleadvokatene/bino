-- +migrate Up
UPDATE patient
SET google_id = regexp_replace(
    google_id,
    '^https://docs\.google\.com/document/d/([^/?#\n]+).*$', 
    '\1'
)
WHERE google_id LIKE 'https://docs.google.com/document/d/%';

UPDATE patient
SET suggested_google_id = regexp_replace(
    suggested_google_id,
    '^https://docs\.google\.com/document/d/([^/?#\n]+).*$', 
    '\1'
)
WHERE suggested_google_id LIKE 'https://docs.google.com/document/d/%';
