-- +migrate Up

-- Each statement creates a group, names it, and assigns species without a
-- group by genus
WITH g AS (INSERT INTO species_group DEFAULT VALUES RETURNING id),
     n AS (INSERT INTO species_group_language (group_id, language_id, name)
           SELECT g.id, v.lang, v.name FROM g, (VALUES (1, 'Kråkefugler'), (2, 'Corvids')) AS v(lang, name))
UPDATE species SET group_id = (SELECT id FROM g)
WHERE group_id IS NULL
  AND split_part(trim(scientific_name), ' ', 1) IN ('Corvus', 'Coloeus', 'Garrulus', 'Pica');

WITH g AS (INSERT INTO species_group DEFAULT VALUES RETURNING id),
     n AS (INSERT INTO species_group_language (group_id, language_id, name)
           SELECT g.id, v.lang, v.name FROM g, (VALUES (1, 'Vannfugler'), (2, 'Waterbirds')) AS v(lang, name))
UPDATE species SET group_id = (SELECT id FROM g)
WHERE group_id IS NULL
  AND split_part(trim(scientific_name), ' ', 1) IN (
    -- Ducks
    'Anas', 'Aythya', 'Somateria', 'Mergus', 'Bucephala',
    -- Geese and swans
    'Anser', 'Branta', 'Cygnus',
    -- Rails
    'Fulica', 'Gallinula'
  );

WITH g AS (INSERT INTO species_group DEFAULT VALUES RETURNING id),
     n AS (INSERT INTO species_group_language (group_id, language_id, name)
           SELECT g.id, v.lang, v.name FROM g, (VALUES (1, 'Rovfugler'), (2, 'Raptors')) AS v(lang, name))
UPDATE species SET group_id = (SELECT id FROM g)
WHERE group_id IS NULL
  AND split_part(trim(scientific_name), ' ', 1) IN ('Accipiter', 'Accipter', 'Buteo', 'Falco', 'Haliaeetus', 'Strix', 'Bubo');

WITH g AS (INSERT INTO species_group DEFAULT VALUES RETURNING id),
     n AS (INSERT INTO species_group_language (group_id, language_id, name)
           SELECT g.id, v.lang, v.name FROM g, (VALUES (1, 'Småfugler'), (2, 'Small songbirds')) AS v(lang, name))
UPDATE species SET group_id = (SELECT id FROM g)
WHERE group_id IS NULL
  AND split_part(trim(scientific_name), ' ', 1) IN (
    -- Tits
    'Parus', 'Cyanistes', 'Periparus', 'Poecile', 'Lophophanes',
    -- Sparrows
    'Passer',
    -- Finches
    'Fringilla', 'Coccothraustes', 'Pyrrhula', 'Carduelis', 'Chloris', 'Spinus',
    -- Thrushes
    'Turdus', 'Erithacus',
    -- Others: wren, wagtail, nuthatch, and the generic small songbird
    'Troglodytes', 'Motacilla', 'Sitta', 'Passeri'
  );

WITH g AS (INSERT INTO species_group DEFAULT VALUES RETURNING id),
     n AS (INSERT INTO species_group_language (group_id, language_id, name)
           SELECT g.id, v.lang, v.name FROM g, (VALUES (1, 'Sjøfugler'), (2, 'Seabirds')) AS v(lang, name))
UPDATE species SET group_id = (SELECT id FROM g)
WHERE group_id IS NULL
  AND split_part(trim(scientific_name), ' ', 1) IN ('Uria', 'Alca', 'Fulmarus', 'Gavia', 'Morus', 'Phalacrocorax');

WITH g AS (INSERT INTO species_group DEFAULT VALUES RETURNING id),
     n AS (INSERT INTO species_group_language (group_id, language_id, name)
           SELECT g.id, v.lang, v.name FROM g, (VALUES (1, 'Vadefugler'), (2, 'Waders')) AS v(lang, name))
UPDATE species SET group_id = (SELECT id FROM g)
WHERE group_id IS NULL
  AND split_part(trim(scientific_name), ' ', 1) IN ('Haematopus', 'Scolopax', 'Numenius', 'Vanellus', 'Calidris');

WITH g AS (INSERT INTO species_group DEFAULT VALUES RETURNING id),
     n AS (INSERT INTO species_group_language (group_id, language_id, name)
           SELECT g.id, v.lang, v.name FROM g, (VALUES (1, 'Tamfugler'), (2, 'Pet birds')) AS v(lang, name))
UPDATE species SET group_id = (SELECT id FROM g)
WHERE group_id IS NULL
  AND split_part(trim(scientific_name), ' ', 1) IN ('Pavo', 'Psittaciformes');

-- Whatever is left
WITH g AS (INSERT INTO species_group DEFAULT VALUES RETURNING id),
     n AS (INSERT INTO species_group_language (group_id, language_id, name)
           SELECT g.id, v.lang, v.name FROM g, (VALUES (1, 'Andre'), (2, 'Other')) AS v(lang, name))
UPDATE species SET group_id = (SELECT id FROM g)
WHERE group_id IS NULL
  AND split_part(trim(scientific_name), ' ', 1) IN ('Apus', 'Undecided');

-- +migrate Down
