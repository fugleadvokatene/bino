-- +migrate Up
CREATE TABLE patient_schedule (
    id             SERIAL PRIMARY KEY,
    patient_id     INTEGER NOT NULL REFERENCES patient(id),
    task_type      TEXT NOT NULL,
    description    TEXT NOT NULL DEFAULT '',
    interval_hours INTEGER NULL,
    next_due_at    TIMESTAMPTZ NOT NULL,
    active         BOOLEAN NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
