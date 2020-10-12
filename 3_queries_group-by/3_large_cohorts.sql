SELECT cohorts.name AS cohort_name, count(*) AS total_students
FROM cohorts
JOIN students ON cohorts.id = students.cohort_id
GROUP BY cohorts.name
HAVING count(*) >= 18
ORDER BY total_students, cohorts.name;
