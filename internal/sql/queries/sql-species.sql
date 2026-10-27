-- name: GetSpecies :many
SELECT * FROM species
ORDER BY id;

-- name: GetSpeciesLanguage :many
SELECT * FROM species_language
ORDER BY (species_id, language_id);

-- name: GetNameOfSpecies :one
SELECT name FROM species_language
WHERE species_id = $1
  AND language_id = $2
;

-- name: AddSpecies :one
INSERT INTO species (scientific_name)
VALUES ($1)
RETURNING id
;

-- name: UpsertSpeciesLanguage :exec
INSERT INTO species_language (species_id, language_id, name)
VALUES ($1, $2, $3)
ON CONFLICT (species_id, language_id) DO UPDATE
    SET name = EXCLUDED.name
;

-- name: GetSpeciesWithLanguage :many
-- group_name is empty without a group, and falls back to another language like
-- GetSpeciesGroupsWithLanguage
SELECT sl.species_id, sl.name, s.group_id, (CASE WHEN s.group_id IS NULL THEN '' ELSE COALESCE((
    SELECT gl.name FROM species_group_language AS gl
    WHERE gl.group_id = s.group_id AND gl.name <> ''
    ORDER BY (gl.language_id = sl.language_id) DESC, gl.language_id
    LIMIT 1
  ), '?') END)::text AS group_name
FROM species_language AS sl
JOIN species AS s
  ON s.id = sl.species_id
WHERE sl.language_id = $1
ORDER BY (sl.species_id)
;

-- name: GetSpeciesByName :many
SELECT species_id
FROM species_language
WHERE name = $1
;

-- name: SetSpeciesGroup :exec
UPDATE species
SET group_id = $2
WHERE id = $1
;

-- name: GetSpeciesGroups :many
SELECT * FROM species_group
ORDER BY id;

-- name: GetSpeciesGroupLanguage :many
SELECT * FROM species_group_language
ORDER BY (group_id, language_id);

-- name: GetSpeciesGroupsWithLanguage :many
-- Every group, named in the given language if possible, otherwise in another
SELECT g.id AS group_id, COALESCE((
    SELECT gl.name FROM species_group_language AS gl
    WHERE gl.group_id = g.id AND gl.name <> ''
    ORDER BY (gl.language_id = @language_id) DESC, gl.language_id
    LIMIT 1
  ), '?')::text AS name
FROM species_group AS g
ORDER BY g.id
;

-- name: AddSpeciesGroup :one
INSERT INTO species_group DEFAULT VALUES
RETURNING id
;

-- name: UpsertSpeciesGroupLanguage :exec
INSERT INTO species_group_language (group_id, language_id, name)
VALUES ($1, $2, $3)
ON CONFLICT (group_id, language_id) DO UPDATE
    SET name = EXCLUDED.name
;

-- name: SetSpeciesScientificName :exec
UPDATE species
SET scientific_name = $2
WHERE id = $1
;
