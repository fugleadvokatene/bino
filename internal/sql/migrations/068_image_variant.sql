-- +migrate Up
ALTER TABLE miniature RENAME TO image_variant;
ALTER TABLE image_variant ADD COLUMN width INT NOT NULL;
ALTER TABLE image_variant ADD COLUMN height INT NOT NULL;

