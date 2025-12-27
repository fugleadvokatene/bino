-- name: UpsertJournal :exec
INSERT INTO journal (google_id, updated, json, markdown, html)
VALUES (@google_id, NOW(), @json, @markdown, @html)
ON CONFLICT (google_id) DO UPDATE
    SET updated=NOW(), json=EXCLUDED.json, markdown=EXCLUDED.markdown, html=EXCLUDED.html
;

-- name: GetJournalHTML :one
SELECT updated, html
FROM journal
WHERE google_id = $1
;

-- name: GetJournalJSON :one
SELECT updated, json
FROM journal
WHERE google_id = $1
;
