-- +migrate Up
ALTER TABLE patient_schedule
    ADD COLUMN remaining_count INTEGER NULL,
    ADD COLUMN end_date        TIMESTAMPTZ NULL,
    ADD COLUMN morning_evening BOOLEAN NOT NULL DEFAULT FALSE;
