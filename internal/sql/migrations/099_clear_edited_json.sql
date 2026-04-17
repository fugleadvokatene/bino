-- +migrate Up
-- Clear old Bino-format edited_json data; new format (GDocsDocument) is incompatible.
UPDATE journal SET edited_json = NULL;
