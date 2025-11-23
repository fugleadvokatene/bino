-- +migrate Up
ALTER TABLE wiki_page
ALTER COLUMN sort_order DROP NOT NULL;
