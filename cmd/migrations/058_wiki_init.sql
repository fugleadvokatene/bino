-- +migrate Up
WITH p AS (
  INSERT INTO wiki_page (sort_order, title, created, creator)
  VALUES (0, 'Home', NOW(), 1)
  RETURNING id
)
INSERT INTO wiki_revision (page_id, content, edited, editor)
SELECT id, '{}', NOW(), 1
FROM p;
