const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  port: '5432',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
if (!cohortName) {
  console.log("Please provide cohort name");
  return;
}
const queryString = `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers 
  JOIN assistance_requests ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name = $1
  ORDER BY teachers.name;
  `;
const values = [`${cohortName}`];

pool.query(queryString,values)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
})
.catch(err => {
  console.error('query error', err.stack);
});