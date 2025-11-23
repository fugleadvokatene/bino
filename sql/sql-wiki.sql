-- name: GetWikiPages :many
SELECT * FROM wiki_page
ORDER BY sort_order ASC, id ASC
;

-- name: GetWikiMainPage :one
SELECT
    wp.*,
    wr.id AS revision_id,
    wr.content AS content
FROM wiki_revision AS wr
JOIN (
  SELECT *
  FROM wiki_page
  ORDER BY sort_order
  LIMIT 1
) AS wp ON wr.page_id = wp.id
ORDER BY wr.edited DESC
LIMIT 1
;

-- name: GetLastWikiRevision :one
SELECT p.*, r.*
FROM wiki_page p
JOIN wiki_revision r ON r.page_id = p.id
WHERE p.id = $1
ORDER BY r.edited DESC
LIMIT 1;

-- name: AddWikiPage :one
WITH p AS (
    INSERT INTO wiki_page (title, created, creator)
    VALUES (@title, NOW(), @creator)
    RETURNING id
),
r AS (
    INSERT INTO wiki_revision (page_id, content, edited, editor)
    SELECT id, '{}', NOW(), @creator
    FROM p
    RETURNING id AS revision_id, page_id
)
SELECT page_id, revision_id
FROM r;
;

-- name: SaveWikiPage :one
INSERT INTO wiki_revision (page_id, content, edited, editor)
VALUES (@page_id, @content, NOW(), @editor)
RETURNING id
;

-- name: SetWikiPageTitle :exec
UPDATE wiki_page
SET title = @title
WHERE id = @id
;

-- name: AssociateFileWithWikiPage :exec
INSERT INTO file_wiki (file_id, wiki_id)
VALUES (@file_id, @wiki_id)
;
