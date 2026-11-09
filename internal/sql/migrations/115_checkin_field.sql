-- +migrate Up
-- Extra, optional template variables on the checkin form. When the journal is
-- created from the template, every occurrence of `variable` is replaced with
-- the submitted value (empty string if left blank).
CREATE TABLE checkin_field (
    id            SERIAL PRIMARY KEY,
    variable      TEXT NOT NULL UNIQUE,
    label         TEXT NOT NULL,
    kind          SMALLINT NOT NULL DEFAULT 0,
    options       TEXT[] NOT NULL DEFAULT '{}',
    default_value TEXT NOT NULL DEFAULT '',
    sort_order    INTEGER NOT NULL DEFAULT 0
);

-- +migrate Down
DROP TABLE checkin_field;
