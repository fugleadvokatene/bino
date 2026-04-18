-- +migrate Up
CREATE TABLE schedule_template (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    description     TEXT NOT NULL DEFAULT '',
    interval_hours  INTEGER NULL,
    morning_evening BOOLEAN NOT NULL DEFAULT FALSE,
    remaining_count INTEGER NULL
);
