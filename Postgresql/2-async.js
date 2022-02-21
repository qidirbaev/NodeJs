"use strict";

const { Pool } = require("pg");

const pool = new Pool({
  host: '127.0.0.1',
  post: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'admin'
});

(async () => {
  const fields = ['schemaname', 'tablename', 'tableowner'].join(', ');
  const sql = `SELECT ${fields} FROM pg_tables`;
  const { rows } = await pool.query(sql);
  console.table(rows);
  pool.end();
})();
