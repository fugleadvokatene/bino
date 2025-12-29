-- +migrate Up
DROP TABLE file_patient;
CREATE TABLE file_journal (
    google_id TEXT NOT NULL,
    file_id INT NOT NULL,
    PRIMARY KEY (google_id, file_id)
);
