-- +migrate Up
-- Switch from patient_id to google_url
ALTER TABLE journal
ADD COLUMN google_url TEXT;

-- Backfill urls from teh patient tablwe
UPDATE journal j
SET google_url = p.journal_url
FROM patient p
WHERE p.id = j.patient_id;

-- Drop patient ID primary key
ALTER TABLE journal
DROP CONSTRAINT journal_pkey;

-- Drop patient ID column
ALTER TABLE journal
DROP COLUMN patient_id;

-- google_url can now be set to not null
ALTER TABLE journal
ALTER COLUMN google_url SET NOT NULL;

-- and now primary key
ALTER TABLE journal
ADD PRIMARY KEY (google_url);
