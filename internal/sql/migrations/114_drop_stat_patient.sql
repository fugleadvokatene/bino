-- +migrate Up
-- Replaced by statistics computed from patient events, see internal/stats
DROP TABLE stat_patient;
DELETE FROM job WHERE name = 'Collect patient stats';

-- +migrate Down
