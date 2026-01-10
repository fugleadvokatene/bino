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

-- name: SetDivisionJournalFolder :exec
UPDATE division
SET journal_folder_id = $2, journal_folder_name = $3
WHERE id = $1
;

-- name: SetDivisionTemplateJournal :exec
UPDATE division
SET template_journal_id = $2, template_journal_name = $3
WHERE id = $1
;

-- name: GetDivisionJournalFolderForAppUser :one
SELECT 'TEST'
FROM appuser
WHERE id = $1
; -- TODO

-- name: GetDivisionJournalFolderForHome :one
SELECT d.journal_folder_id
FROM home AS h
LEFT JOIN division AS d
    ON h.division_id = d.id
WHERE h.id = $1
;

-- name: AddUserToHome :exec
UPDATE appuser
SET home_id = $1
WHERE id = $2
;

-- name: RemoveUserFromHome :exec
UPDATE appuser
SET home_id = 0
WHERE home_id = $1
  AND id = $2
;
