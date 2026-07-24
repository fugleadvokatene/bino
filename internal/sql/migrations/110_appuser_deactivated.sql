-- +migrate Up
ALTER TABLE appuser ADD COLUMN deactivated BOOLEAN NOT NULL DEFAULT FALSE;

-- +migrate Down
