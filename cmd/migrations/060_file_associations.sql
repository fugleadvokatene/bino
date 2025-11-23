-- +migrate Up
CREATE TABLE file_wiki (
    file_id INT NOT NULL,
    wiki_id INT NOT NULL
);

CREATE TABLE file_patient (
    file_id    INT NOT NULL,
    patient_id INT NOT NULL
);
