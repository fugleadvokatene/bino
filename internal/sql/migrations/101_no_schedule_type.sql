-- +migrate Up
ALTER TABLE patient_schedule DROP COLUMN task_type;
