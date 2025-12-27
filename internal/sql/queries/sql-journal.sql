-- name: UpsertJournal :exec
INSERT INTO journal (
    google_id,
    updated,
    json,
    lang,
    header,
    body,
    markdown,
    html
)
VALUES (@google_id, NOW(), @json, @lang, @header, @body, @markdown, @html)
ON CONFLICT (google_id) DO UPDATE
    SET updated=NOW(),
        json=EXCLUDED.json,
        lang=EXCLUDED.lang,
        header=EXCLUDED.header,
        body=EXCLUDED.body,
        markdown=EXCLUDED.markdown,
        html=EXCLUDED.html
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
