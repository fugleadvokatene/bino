-- +migrate Up
CREATE TABLE job (
    name TEXT PRIMARY KEY,
    last_success TIMESTAMPTZ NOT NULL
);