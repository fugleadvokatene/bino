-- +migrate Up
UPDATE journal SET lang = 'norwegian' WHERE true;
UPDATE journal SET body = markdown WHERE body IS NULL;
UPDATE journal SET header = split_part(body, E'\n', 1) WHERE header IS NULL;
