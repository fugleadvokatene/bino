-- +migrate Up
CREATE TABLE stat_debug (
    key   SMALLINT    NOT NULL,
    time  TIMESTAMPTZ NOT NULL,
    value REAL        NOT NULL
);
CREATE INDEX idx_stat_debug_t ON stat_debug (key, time);
