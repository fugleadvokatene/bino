-- name: CreateUser :one
INSERT INTO appuser (
  display_name,
  google_sub,
  email, 
  avatar_url,
  access_level,
  home_id
) VALUES (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6
)
RETURNING id
;

-- name: UpdateUser :exec
UPDATE appuser
SET display_name = @display_name,
    google_sub = @google_sub,
    avatar_url = @avatar_url
WHERE id = $1
  AND email = $2
;

-- name: GetUserIDByEmail :one
SELECT id
FROM appuser
WHERE email = $1
;

-- name: GetUser :one
SELECT *
FROM appuser
WHERE id = $1
;

-- name: GetAppusers :many
SELECT *
FROM appuser
ORDER BY id
;

-- name: GetAppusersInDivision :many
SELECT au.*
FROM appuser AS au
LEFT JOIN home AS h
  ON h.id = au.home_id
WHERE h.division = $1
ORDER BY au.id
;

-- name: SetUserLanguage :exec
UPDATE appuser
SET language_id = $2
WHERE id = $1
;

-- name: SetLoggingConsent :exec
UPDATE appuser SET logging_consent = NOW() + sqlc.arg(period)::INT * INTERVAL '1 day'
WHERE id = $1
;

-- name: RevokeLoggingConsent :exec
UPDATE appuser SET logging_consent = NULL
WHERE id = $1
;

-- name: SetUserGDriveAccess :exec
UPDATE appuser
SET has_gdrive_access = $2
WHERE id = $1
;

-- name: ClearAllUserGDriveAccess :exec
UPDATE appuser
SET has_gdrive_access = FALSE
WHERE 1
;

-- name: GetAppusersForHome :many
SELECT *
FROM appuser
WHERE home_id = $1
;

-- name: GetHomeWithDataForUser :one
SELECT h.*
FROM appuser AS a
INNER JOIN home AS h
  ON h.id = a.id
WHERE a.id = $1
;

-- name: RemoveHomeForAppuser :exec
UPDATE appuser
SET home_id = 0
WHERE id = $1
;

-- name: DeleteSessionsForUser :exec
DELETE
FROM session
WHERE appuser_id = $1
;

-- name: ScrubAppuser :exec
UPDATE appuser SET
  display_name = 'Deleted user (id = ' || id || ')',
  google_sub = '',
  email = '',
  logging_consent = NULL,
  avatar_url = '',
  has_gdrive_access = FALSE 
WHERE id = $1
;

-- name: DeleteAppuser :exec
DELETE
FROM appuser
WHERE id = $1
;

-- name: GetUsersWithGoogleStoredAvatars :many
SELECT id, avatar_url
FROM appuser
WHERE avatar_url LIKE '%googleusercontent.com%'
;

-- name: UpdateUserAvatar :exec
UPDATE appuser
SET avatar_url = @url
WHERE id = @id
;

-- name: GetHomeForUser :one
SELECT h.* 
FROM appuser AS a
INNER JOIN home AS h
  ON h.id = a.home_id
WHERE a.id = $1
;
