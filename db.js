const { Pool } = require('pg');

const pool = new Pool({
  user: 'learner', // Your database user
  host: 'neetprep-staging.cvvtorjqg7t7.ap-south-1.rds.amazonaws.com', // Your database host
  database: 'learner_development', // Your database name
  password: 'Deq05h0KiL6icSvS', // Your database password
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
