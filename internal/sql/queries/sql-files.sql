-- name: PublishFile :one
INSERT
INTO file
  (uuid, accessibility, creator, created, filename, presentation_filename, mimetype, size, sha256)
VALUES 
  (@uuid, @accessibility, @creator, @created, @filename, @filename, @mimetype, @size, @sha256)
RETURNING id
;

-- name: UnpublishFile :exec
DELETE
FROM file
WHERE id = @id
;

-- name: PublishVariant :exec
INSERT
INTO image_variant
  (file_id, variant, filename, mimetype, size, width, height, sha256)
VALUES
  (@file_id, @variant, @filename, @mimetype, @size, @width, @height, @sha256)
;

-- name: GetVariant :one
SELECT *
FROM image_variant
WHERE file_id=$1 AND variant=$2
;

-- name: GetFilesAccessibleByUser :many
SELECT *
FROM file
WHERE
      creator = @creator
  OR accessibility >= @accessibility
;

-- name: GetAllFileWikiAssociations :many
SELECT * from file_wiki
;


-- name: GetFileWikiAssociationsAccessibleByUser :many
SELECT fw.file_id, fw.wiki_id, wp.title
FROM file
INNER JOIN file_wiki AS fw
  ON file.id = fw.file_id
INNER JOIN wiki_page AS wp
  ON wp.id = fw.wiki_id
WHERE
      file.creator = @creator
  OR accessibility >= @accessibility
ORDER BY fw.wiki_id
;

-- name: GetFilePatientAssociationsAccessibleByUser :many
SELECT fp.file_id, fp.patient_id, p.name
FROM file
INNER JOIN file_patient AS fp
  ON file.id = fp.file_id
INNER JOIN patient AS p
  ON p.id = fp.patient_id
WHERE
      file.creator = @creator
  OR accessibility >= @accessibility
ORDER BY fp.patient_id
;

-- name: GetImageVariantsAccessibleByUser :many
SELECT iv.*
FROM file
INNER JOIN image_variant AS iv
  ON file.id = iv.file_id
WHERE
      file.creator = @creator
  OR accessibility >= @accessibility
ORDER BY iv.variant DESC
;

-- name: GetFilesMissingOriginalVariant :many
SELECT f.*
FROM file AS f
LEFT JOIN image_variant AS iv
  ON f.id = iv.file_id
WHERE iv.file_id IS NULL
;

-- name: GetFilesMissingMiniatures :many
SELECT f.*
FROM file AS f
WHERE NOT f.miniatures_created
;

-- name: SetMiniaturesCreated :exec
UPDATE file
SET miniatures_created=TRUE
WHERE id = @id
;

-- name: GetFilesMissingHash :many
SELECT *
FROM file
WHERE sha256 IS NULL
;

-- name: GetFileBySizeAndHash :one
SELECT *
FROM file
WHERE size = @size AND sha256 = @sha256
LIMIT 1
;

-- name: SetFileHash :exec
UPDATE file
SET sha256 = $2
WHERE id = $1
;

-- name: GetImageVariantsMissingHash :many
SELECT iv.*, f.uuid
FROM image_variant as iv
INNER JOIN file AS f
  ON iv.file_id = f.id
WHERE iv.sha256 IS NULL
;

-- name: SetImageVariantHash :exec
UPDATE image_variant
SET sha256 = $3
WHERE file_id = $1 AND variant = $2
;

-- name: GetFileByID :one
SELECT *
FROM file
WHERE id = @id
;

-- name: UpdatePresentationFilename :exec
UPDATE file
SET presentation_filename = @filename
WHERE id = @id
;

-- name: RemoveFalseFileWikiLinks :execresult
with unused as (
    select fw.file_id, fw.wiki_id
    from file_wiki fw
    left join wiki_revision wr
      on wr.page_id = fw.wiki_id
         and wr.content @? (
               ('$.blocks[*].data.file.url ? (@ like_regex "^/file/' || fw.file_id || '")')::jsonpath
           )
    where wr.page_id is null
)
delete from file_wiki fw
using unused u
where fw.file_id = u.file_id
  and fw.wiki_id = u.wiki_id
;
