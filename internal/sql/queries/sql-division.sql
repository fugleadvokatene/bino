-- name: GetDivisions :many
SELECT * FROM division
ORDER BY id ASC
;

-- name: SetDivisionName :exec
UPDATE division SET name = $2 WHERE id = $1
;

-- name: InsertDivision :exec
INSERT INTO division (name) VALUES ($1)
;

-- name: DeleteDivision :exec
DELETE FROM division WHERE id = $1
;
