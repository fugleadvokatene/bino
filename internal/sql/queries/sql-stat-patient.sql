-- name: StatPatientInsert :execrows
INSERT INTO stat_patient (date, species_id, home_id, patient_id)
SELECT
  @date::date,
  s.species_id,
  h.home_id,
  p.patient_id
FROM unnest(@species_id::int[]) WITH ORDINALITY AS s(species_id, ord)
JOIN unnest(@home_id::int[])    WITH ORDINALITY AS h(home_id, ord)
  USING (ord)
JOIN unnest(@patient_id::int[])      WITH ORDINALITY AS p(patient_id, ord)
  USING (ord)
;

-- name: DeleteStatPatientForDate :exec
DELETE FROM stat_patient WHERE date = @date;

-- name: StatPatientGetCurrentTotalCount :one
SELECT count(*) AS count
FROM stat_patient
WHERE date = $1
;

-- name: StatPatientGetCurrentSpeciesDistribution :many
SELECT COALESCE(sl.name, '?'), count(sp.patient_id) AS count
FROM stat_patient AS sp
LEFT JOIN species_language AS sl
  ON sl.species_id = sp.species_id
WHERE date = (
    SELECT MAX(date)
    FROM stat_patient
) AND sl.language_id = @language_id
GROUP BY sl.name
ORDER BY count DESC;

-- name: StatPatientGetSpeciesDistributionOverTime :many
SELECT date, COALESCE(sl.name, '?'), count(sp.patient_id) AS count
FROM stat_patient AS sp
LEFT JOIN species_language AS sl
  ON sl.species_id = sp.species_id
WHERE date >= @first_date AND date <= @last_date AND sl.language_id = @language_id
GROUP BY date, sl.name
ORDER BY date
;

SELECT date, species_id, count(patient_id)
FROM stat_patient
WHERE date >= @first_date AND date <= @last_date
GROUP BY species_id, date
;

-- name: StatPatientGetSpeciesDistributionOverTimeForHome :many
SELECT date, species_id, count(patient_id)
FROM stat_patient
WHERE date >= @first_date AND date <= @last_date AND home_id=@home_id
GROUP BY species_id, date
;
