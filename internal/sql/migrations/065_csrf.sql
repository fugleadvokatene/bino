-- +migrate Up
ALTER TABLE session ADD COLUMN csrf TEXT;
