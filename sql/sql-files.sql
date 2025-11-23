-- name: RegisterFile :one
INSERT
INTO file
  (uuid, accessibility, creator, created, filename, presentation_filename, mimetype, size)
VALUES 
  (@uuid, @accessibility, @creator, @created, @filename, @filename, @mimetype, @size)
RETURNING id
;

-- name: DeregisterFile :exec
DELETE
FROM file
WHERE id = @id
;

-- name: GetFilesAccessibleByUser :many
SELECT *
FROM file
WHERE
      creator = @creator
  OR accessibility >= @accessibility
ORDER BY created DESC
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
ORDER BY file.created DESC
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
ORDER BY file.created DESC
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
