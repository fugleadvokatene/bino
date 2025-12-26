-- name: UpsertJournal :exec
INSERT INTO journal (patient_id, updated, json, markdown, html)
VALUES (@patient_id, NOW(), @json, @markdown, @html)
ON CONFLICT (patient_id) DO UPDATE
    SET updated=NOW(), json=EXCLUDED.json, markdown=EXCLUDED.markdown, html=EXCLUDED.html
;

-- name: GetJournalHTML :one
SELECT updated, html
FROM journal
WHERE patient_id = $1
;

-- name: GetJournalJSON :one
SELECT updated, json
FROM journal
WHERE patient_id = $1
;
