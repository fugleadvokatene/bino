-- +migrate Up
ALTER TABLE appuser ADD COLUMN home_id INT;
UPDATE appuser a SET home_id = l.home_id FROM home_appuser l WHERE l.appuser_id = a.id;
DROP TABLE home_appuser;