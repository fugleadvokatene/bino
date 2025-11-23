-- +migrate Up
ALTER TABLE file_wiki ADD PRIMARY KEY (file_id, wiki_id);
ALTER TABLE file_patient ADD PRIMARY KEY (file_id, patient_id);
