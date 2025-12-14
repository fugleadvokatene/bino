-- name: GetFeatureFlagsForUser :many
SELECT * FROM feature_flag
WHERE appuser_id = $1
;

-- name: SetFeatureFlagForUser :exec
INSERT INTO feature_flag (flag, appuser_id)
VALUES (@flag, @appuser_id)
;

-- name: ClearFeatureFlagForUser :exec
DELETE FROM feature_flag
WHERE
        flag       = @flag
    AND appuser_id = @appuser_id
;

-- name: CreateFeatureFlag :exec
INSERT INTO feature_flag (flag, appuser_id)
VALUES (@flag, 0)
;

-- name: DeleteFeatureFlag :exec
DELETE FROM feature_flag
WHERE flag = @flag;

-- name: GetAllFeatureFlags :many
SELECT
  u.id,
  u.display_name,
  f.flag,
  CASE WHEN ff.appuser_id IS NOT NULL THEN true ELSE false END AS is_set
FROM appuser u
CROSS JOIN (
  SELECT DISTINCT flag FROM feature_flag
) f
LEFT JOIN feature_flag ff
  ON ff.appuser_id = u.id
 AND ff.flag = f.flag
ORDER BY f.flag, u.id
;