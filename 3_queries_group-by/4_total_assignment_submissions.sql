SELECT cohorts.name AS cohort_name, COUNT(assignment_submissions.*) AS total_submissions
FROM cohorts
JOIN students ON cohorts.id = cohort_id
JOIN assignment_submissions ON assignment_submissions.student_id = students.id
GROUP BY cohorts.name
ORDER BY total_submissions DESC;