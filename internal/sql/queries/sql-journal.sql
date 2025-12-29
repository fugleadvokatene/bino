-- name: UpsertJournal :exec
INSERT INTO journal (
    google_id,
    origin,
    parent_google_id,
    updated,
    json,
    lang,
    header,
    body,
    markdown,
    html
)
VALUES (
    @google_id,
    @origin,
    @parent_google_id, 
    NOW(),
    @json,
    @lang,
    @header,
    @body,
    @markdown,
    @html
)
ON CONFLICT (google_id) DO UPDATE
    SET updated=NOW(),
        origin=EXCLUDED.origin,
        parent_google_id=EXCLUDED.parent_google_id,
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
SELECT updated, parent_google_id, gf.name AS parent_google_name, json
FROM journal
LEFT JOIN google_folder AS gf
    ON gf.google_id = journal.parent_google_id
WHERE journal.google_id = $1
;

-- name: DeleteJournal :exec
DELETE
FROM journal
WHERE google_id = @google_id
;

-- name: GetJournalMetadata :one
SELECT updated, parent_google_id
FROM journal
WHERE google_id = @google_id
;

-- name: SetGoogleParentFolder :exec
UPDATE journal
SET parent_google_id = $2
WHERE google_id = $1
;

-- name: GetGoogleFolder :one
SELECT *
FROM google_folder
WHERE google_id = $1
;

-- name: SaveGoogleFolder :exec
INSERT INTO google_folder (google_id, name)
VALUES (@google_id, @name)
ON CONFLICT (google_id) DO UPDATE
    SET name=EXCLUDED.name
;
