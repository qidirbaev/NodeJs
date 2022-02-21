"use strict";

const { Pool } = require("pg");

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'admin'
});

const fields = ['schemaname', 'tablename', 'tableowner'];
const sql = `SELECT ${fields.join(', ')} FROM pg_catalog.pg_tables WHERE tableowner = $1`;

pool.query(sql, ['postgres'])
    .then(res => {
	const { rows } = res;
	console.table(rows);
    })
    .catch(console.error)
    .finally(() => {
	pool.end();
    });
