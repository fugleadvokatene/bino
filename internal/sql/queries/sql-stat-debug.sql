-- name: StatDebugInsert :execrows
INSERT INTO stat_debug (time, key, value)
SELECT
  @time::timestamptz,
  k.key,
  v.value
FROM unnest(@key::smallint[]) WITH ORDINALITY AS k(key, ord)
JOIN unnest(@value::real[])     WITH ORDINALITY AS v(value, ord)
USING (ord);

-- name: StatDebugGet :many
SELECT time, key, value
FROM stat_debug
WHERE key = ANY(@keys::smallint[])
  AND time >= @start::timestamptz
  AND time <= @stop::timestamptz
ORDER BY key, time;
