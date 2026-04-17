-- name: UpsertJournal :exec
INSERT INTO journal (
    google_id,
    origin,
    parent_google_id,
    updated,
    raw_json,
    image_urls,
    lang,
    header,
    body,
    version
)
VALUES (
    @google_id,
    @origin,
    @parent_google_id,
    NOW(),
    @raw_json,
    @image_urls,
    @lang,
    @header,
    @body,
    @version
)
ON CONFLICT (google_id) DO UPDATE
    SET updated=NOW(),
        origin=EXCLUDED.origin,
        parent_google_id=EXCLUDED.parent_google_id,
        raw_json=EXCLUDED.raw_json,
        image_urls=EXCLUDED.image_urls,
        lang=EXCLUDED.lang,
        header=EXCLUDED.header,
        body=EXCLUDED.body,
        version=EXCLUDED.version,
        edited_json=NULL
;

-- name: GetJournalJSON :one
SELECT updated, parent_google_id, gf.name AS parent_google_name, raw_json, image_urls, edited_json
FROM journal
LEFT JOIN google_folder AS gf
    ON gf.google_id = journal.parent_google_id
WHERE journal.google_id = $1
;

-- name: UpdateJournalEdited :exec
UPDATE journal
SET edited_json = $2
WHERE google_id = $1
;

-- name: DeleteJournal :exec
DELETE
FROM journal
WHERE google_id = @google_id
;

-- name: GetJournalMetadata :one
SELECT j.updated, j.parent_google_id, gf.name AS parent_google_name, j.version
FROM journal AS j
LEFT JOIN google_folder AS gf
    ON gf.google_id = j.parent_google_id
WHERE j.google_id = @google_id
;

-- name: GetJournalImageURLs :one
SELECT image_urls
FROM journal
WHERE google_id = $1
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

-- name: GetJournalsUpdatedAfter :many
SELECT google_id, raw_json, image_urls
FROM journal
WHERE updated > $1
ORDER BY updated ASC
;
