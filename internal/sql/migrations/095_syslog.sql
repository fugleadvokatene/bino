-- +migrate Up
CREATE TABLE syslog (
    id        SERIAL PRIMARY KEY,
    message   TEXT NOT NULL,
    severity  INT NOT NULL,
    time      TIMESTAMPTZ NOT NULL
);
