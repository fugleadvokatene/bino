-- +migrate Up
CREATE TABLE wiki_page (
  id         SERIAL PRIMARY KEY,
  sort_order INT NOT NULL,
  title      TEXT NOT NULL,
  created    TIMESTAMPTZ NOT NULL,
  creator    INT NOT NULL
);

CREATE TABLE wiki_revision (
  id        SERIAL PRIMARY KEY,
  page_id   INT NOT NULL,
  content   JSONB NOT NULL,
  edited    TIMESTAMPTZ NOT NULL,
  editor    INT NOT NULL
);
