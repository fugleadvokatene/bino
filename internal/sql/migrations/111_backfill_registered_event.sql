-- +migrate Up

-- A few early patients have no Registered event. Synthesize one from
-- time_checkin, in the home of their earliest event.
INSERT INTO patient_event (patient_id, home_id, event_id, note, time)
SELECT p.id, first_event.home_id, 1, '', p.time_checkin
FROM patient AS p
JOIN LATERAL (
  SELECT pe.home_id
  FROM patient_event AS pe
  WHERE pe.patient_id = p.id AND pe.home_id <> 0
  ORDER BY pe.time, pe.id
  LIMIT 1
) AS first_event ON TRUE
WHERE p.time_checkin IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM patient_event AS pe
    WHERE pe.patient_id = p.id AND pe.event_id = 1
  )
;

-- +migrate Down
