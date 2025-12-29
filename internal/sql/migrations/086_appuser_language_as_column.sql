-- +migrate Up
ALTER TABLE appuser ADD COLUMN language_id INT;
UPDATE appuser a SET language_id = l.language_id FROM appuser_language l WHERE l.appuser_id = a.id;
DROP TABLE appuser_language;