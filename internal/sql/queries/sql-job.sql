-- name: MarkJobCompleted :exec
INSERT INTO job (name, last_success) VALUES ($1, $2)
ON CONFLICT (name) DO UPDATE SET last_success = EXCLUDED.last_success
;

-- name: GetJobLastSuccess :one
SELECT last_success FROM job WHERE name = $1
;