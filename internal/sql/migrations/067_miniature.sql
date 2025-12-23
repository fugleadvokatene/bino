-- +migrate Up
CREATE TABLE miniature (
  file_id INT NOT NULL,
  variant TEXT NOT NULL,
  filename TEXT NOT NULL,
  mimetype TEXT NOT NULL,
  size INT NOT NULL,
  PRIMARY KEY (file_id, variant)
);
