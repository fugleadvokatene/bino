-- name: GetCheckinFields :many
SELECT *
FROM checkin_field
ORDER BY sort_order ASC, id ASC;

-- name: AddCheckinField :exec
INSERT INTO checkin_field (variable, label, kind, options, default_value, sort_order)
VALUES (@variable, @label, @kind, @options, @default_value, @sort_order);

-- name: UpdateCheckinField :exec
UPDATE checkin_field
SET variable      = @variable,
    label         = @label,
    kind          = @kind,
    options       = @options,
    default_value = @default_value,
    sort_order    = @sort_order
WHERE id = @id;

-- name: DeleteCheckinField :exec
DELETE FROM checkin_field WHERE id = $1;
