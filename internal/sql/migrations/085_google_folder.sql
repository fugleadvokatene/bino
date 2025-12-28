-- +migrate Up
CREATE TABLE google_folder (
    google_id TEXT PRIMARY KEY,
    name TEXT NOT NULL
);
