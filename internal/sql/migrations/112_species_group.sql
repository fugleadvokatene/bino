-- +migrate Up
CREATE TABLE species_group (
    id SERIAL PRIMARY KEY
);
COMMENT ON TABLE species_group IS 'Each row is a group of species, e.g. gulls';

CREATE TABLE species_group_language (
    group_id    INTEGER NOT NULL,
    language_id INTEGER NOT NULL,
    name        TEXT NOT NULL,
    PRIMARY KEY (group_id, language_id),
    FOREIGN KEY (group_id) REFERENCES species_group(id)
);
COMMENT ON TABLE species_group_language IS 'Internationalization for species_group';

ALTER TABLE species ADD COLUMN group_id INTEGER NULL REFERENCES species_group(id);

-- Start with gulls and pigeons
INSERT INTO species_group (id) VALUES (1), (2);
SELECT setval('species_group_id_seq', 2);

INSERT INTO species_group_language (group_id, language_id, name) VALUES
    (1, 1, 'Måker'),
    (1, 2, 'Gulls'),
    (2, 1, 'Duer'),
    (2, 2, 'Pigeons');

UPDATE species SET group_id = 1
WHERE split_part(trim(scientific_name), ' ', 1) IN ('Larus', 'Chroicocephalus');

UPDATE species SET group_id = 2
WHERE split_part(trim(scientific_name), ' ', 1) IN ('Columba', 'Streptopelia');

-- +migrate Down
