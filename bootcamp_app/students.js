const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  port: '5432',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id as id, students.name as student, cohorts.name as cohort 
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE  '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.student} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => {
  console.error('query error', err.stack);
});