-- +migrate Up
ALTER TABLE file ADD COLUMN presentation_filename text;
UPDATE file SET presentation_filename = filename;
ALTER TABLE file ALTER COLUMN presentation_filename SET NOT NULL;
