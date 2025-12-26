-- +migrate Up
ALTER TABLE file DROP COLUMN accessibility;
ALTER TABLE file DROP COLUMN creator;
