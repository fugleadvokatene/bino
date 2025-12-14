-- +migrate Up
CREATE TABLE feature_flag (
  flag        TEXT NOT NULL,
  appuser_id  INT NOT NULL
);
