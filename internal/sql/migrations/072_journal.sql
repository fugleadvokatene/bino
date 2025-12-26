-- +migrate Up
CREATE TABLE journal (
    patient_id INT PRIMARY KEY,
    updated   TIMESTAMPTZ NOT NULL,
    json      JSONB,
    markdown  TEXT,
    html      TEXT
);
