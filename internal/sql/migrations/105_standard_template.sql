-- +migrate Up
ALTER TABLE schedule_template ADD COLUMN standard BOOLEAN NOT NULL DEFAULT FALSE;
