-- +migrate Up
CREATE TABLE home_setting (
    home_id INTEGER NOT NULL REFERENCES home(id),
    key     TEXT NOT NULL,
    value   TEXT NOT NULL,
    PRIMARY KEY (home_id, key)
);

INSERT INTO home_setting (home_id, key, value)
SELECT id, 'capacity', capacity::text FROM home WHERE capacity != 0;

ALTER TABLE home DROP COLUMN capacity;
