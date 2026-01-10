-- +migrate Up
CREATE TABLE division (
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO division (name) VALUES ('Default division');

ALTER TABLE home ADD COLUMN division INT NOT NULL DEFAULT 1;
