-- name: GetAllActiveSchedules :many
SELECT
    s.id,
    s.description,
    s.interval_hours,
    s.next_due_at,
    s.remaining_count,
    s.end_date,
    s.morning_evening,
    owner.owner_name,
    owner.owner_url
FROM schedule s
JOIN (
    SELECT ps.schedule_id,
           p.name                         AS owner_name,
           ('/patient/' || p.id::text)::text AS owner_url
    FROM patient_schedule ps
    JOIN patient p ON p.id = ps.patient_id
    WHERE p.curr_home_id = $1
    UNION ALL
    SELECT hs.schedule_id,
           h.name                              AS owner_name,
           ('/home/' || h.id::text)::text      AS owner_url
    FROM home_schedule hs
    JOIN home h ON h.id = hs.home_id
    WHERE h.id = $1
) owner ON owner.schedule_id = s.id
WHERE s.active = TRUE
ORDER BY s.next_due_at ASC;

-- name: GetSchedulesForPatient :many
SELECT s.id, s.description, s.interval_hours, s.next_due_at, s.remaining_count, s.end_date, s.morning_evening, s.active, s.created_at
FROM schedule s
JOIN patient_schedule ps ON ps.schedule_id = s.id
WHERE ps.patient_id = $1 AND s.active = TRUE
ORDER BY s.next_due_at ASC;

-- name: GetSchedulesForHome :many
SELECT s.id, s.description, s.interval_hours, s.next_due_at, s.remaining_count, s.end_date, s.morning_evening, s.active, s.created_at
FROM schedule s
JOIN home_schedule hs ON hs.schedule_id = s.id
WHERE hs.home_id = $1 AND s.active = TRUE
ORDER BY s.next_due_at ASC;

-- name: GetSchedule :one
SELECT id, description, interval_hours, next_due_at, remaining_count, end_date, morning_evening, active, created_at
FROM schedule
WHERE id = $1;

-- name: AddSchedule :one
INSERT INTO schedule (description, interval_hours, next_due_at, remaining_count, end_date, morning_evening)
VALUES (@description, @interval_hours, @next_due_at, @remaining_count, @end_date, @morning_evening)
RETURNING id;

-- name: LinkScheduleToPatient :exec
INSERT INTO patient_schedule (schedule_id, patient_id) VALUES (@schedule_id, @patient_id);

-- name: LinkScheduleToHome :exec
INSERT INTO home_schedule (schedule_id, home_id) VALUES (@schedule_id, @home_id);

-- name: CompleteSchedule :exec
UPDATE schedule
SET
    next_due_at     = @next_due_at,
    active          = @active,
    remaining_count = @remaining_count
WHERE id = @id;

-- name: UpdateSchedule :exec
UPDATE schedule
SET description     = @description,
    interval_hours  = @interval_hours,
    next_due_at     = @next_due_at,
    remaining_count = @remaining_count,
    end_date        = @end_date,
    morning_evening = @morning_evening
WHERE id = @id;

-- name: SnoozeSchedule :exec
UPDATE schedule
SET next_due_at = next_due_at + INTERVAL '1 day'
WHERE id = $1;

-- name: DeleteSchedule :exec
UPDATE schedule
SET active = FALSE
WHERE id = $1;

-- name: DeleteSchedulesForPatient :exec
UPDATE schedule
SET active = FALSE
WHERE id IN (SELECT schedule_id FROM patient_schedule WHERE patient_id = $1);

-- name: GetScheduleTemplates :many
SELECT id, name, description, interval_hours, morning_evening, remaining_count, standard
FROM schedule_template
ORDER BY name ASC;

-- name: GetStandardScheduleTemplates :many
SELECT id, name, description, interval_hours, morning_evening, remaining_count, standard
FROM schedule_template
WHERE standard = TRUE
ORDER BY name ASC;

-- name: AddScheduleTemplate :exec
INSERT INTO schedule_template (name, description, interval_hours, morning_evening, remaining_count, standard)
VALUES (@name, @description, @interval_hours, @morning_evening, @remaining_count, @standard);

-- name: UpdateScheduleTemplate :exec
UPDATE schedule_template
SET name            = @name,
    description     = @description,
    interval_hours  = @interval_hours,
    morning_evening = @morning_evening,
    remaining_count = @remaining_count,
    standard        = @standard
WHERE id = @id;

-- name: DeleteScheduleTemplate :exec
DELETE FROM schedule_template WHERE id = $1;

-- name: CountOverdueSchedules :one
SELECT COUNT(*)::int
FROM schedule s
WHERE s.active = TRUE
  AND s.next_due_at <= NOW()
  AND (
      EXISTS (
          SELECT 1 FROM patient_schedule ps
          JOIN patient p ON p.id = ps.patient_id
          WHERE ps.schedule_id = s.id AND p.curr_home_id = $1
      )
      OR EXISTS (
          SELECT 1 FROM home_schedule hs WHERE hs.schedule_id = s.id AND hs.home_id = $1
      )
  );
