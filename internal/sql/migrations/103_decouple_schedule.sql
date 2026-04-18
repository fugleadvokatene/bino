-- +migrate Up

-- Create the base schedule table
CREATE TABLE schedule (
    id              SERIAL PRIMARY KEY,
    description     TEXT NOT NULL DEFAULT '',
    interval_hours  INTEGER NULL,
    next_due_at     TIMESTAMPTZ NOT NULL,
    remaining_count INTEGER NULL,
    end_date        TIMESTAMPTZ NULL,
    morning_evening BOOLEAN NOT NULL DEFAULT FALSE,
    active          BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Copy existing schedule data (preserving IDs)
INSERT INTO schedule (id, description, interval_hours, next_due_at, remaining_count, end_date, morning_evening, active, created_at)
SELECT id, description, interval_hours, next_due_at, remaining_count, end_date, morning_evening, active, created_at
FROM patient_schedule;

SELECT setval('schedule_id_seq', COALESCE((SELECT MAX(id) FROM schedule), 1));

-- Rename old table to free the name
ALTER TABLE patient_schedule RENAME TO patient_schedule_old;

-- New patient_schedule is a join table
CREATE TABLE patient_schedule (
    schedule_id INTEGER NOT NULL REFERENCES schedule(id),
    patient_id  INTEGER NOT NULL REFERENCES patient(id),
    PRIMARY KEY (schedule_id)
);

INSERT INTO patient_schedule (schedule_id, patient_id)
SELECT id, patient_id FROM patient_schedule_old;

DROP TABLE patient_schedule_old;

-- Home schedule join table
CREATE TABLE home_schedule (
    schedule_id INTEGER NOT NULL REFERENCES schedule(id),
    home_id     INTEGER NOT NULL REFERENCES home(id),
    PRIMARY KEY (schedule_id)
);
