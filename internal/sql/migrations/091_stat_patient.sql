-- +migrate Up
CREATE TABLE stat_patient (
    date       DATE NOT NULL,
    species_id INT NOT NULL,
    home_id    INT NOT NULL,
    patient_id INT NOT NULL
);
