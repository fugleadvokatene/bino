-- +migrate Up
ALTER TABLE file          ADD COLUMN sha256 BYTEA NULL;
CREATE INDEX idx_file_sha256 ON file (sha256);
ALTER TABLE image_variant ADD COLUMN sha256 BYTEA NULL;
CREATE INDEX idx_image_variant_sha256 ON image_variant (sha256);
