"use strict";

const { Pool } = require("pg");

const pool = new Pool({
  host: '127.0.0.1',
  post: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'admin'
});

const fields = ['schemaname', 'tablename', 'tableowner'].join(', ');

const sql = `SELECT ${fields} FROM pg_tables WHERE tableowner = $1`;

pool.query(sql, ['postgres'], (err, res) => {
  if (err) throw err;
  console.dir({ res });
  console.table(res.fields);
  console.table(res.rows);
  pool.end();
});

