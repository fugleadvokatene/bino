-- +migrate Up
ALTER TABLE patient_event RENAME COLUMN associated_id TO status;
