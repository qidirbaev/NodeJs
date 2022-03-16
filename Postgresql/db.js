"use strict";

const { Pool } = require("pg");

const MODE_WORS = 0;
const MODE_VALUE = 1;
const MODE_ROW = 2;
const MODE_COL = 3;
const MODE_COUNT = 4;

const where = conditions => {
    const args = [];
    let i = 1, clause = "";
    for (const key in conditions) {
        let value = conditions[key];
        let condition = `${key} = $${i}`;
        if (typeof value === 'string') {
            if (value.startsWith('>=')) {
                condition = `${key} = $${i}`;
                value = value.substring(2);
            } else if (value.startsWith('<=')) {
                condition = `${key} <= $${i}`;
                value = value.substring(2);
            } else if (value.startsWith('<>')) {
                condition = `${key} <> $${i}`;
                value = value.substring(2);
            } else if (value.startsWith('>')) {
                condition = `${key} > $${i}`;
                value = value.substring(1);
            } else if (value.startsWith('<')) {
                condition = `${key} < $${i}`;
                value = value.substring(1);
            } else if (value.includes('*') || value.includes('?')) {
                value = value.replace(/\*/g, '%').replace(/\?/g, '_');
                condition = `${key} LIKE $${i}`;
            }
        }
        i++;
        args.push(value);
        clause = clause ? `${clause} AND ${condition}` : condition;
    }
    console.dir({ clause, args });
    return { clause, args };
};

class Cursor {
    constructor(database, table) {
        this.database = database;
        this.table = table;
        this.cols = null;
        this.rows = null;
        this.rowCount = 0;
        this.ready = false;
        this.mode = MODE_WORS;
        this.whereClause = undefined;
        this.columns = ['*'];
        this.args = [];
    }
    resolve(result) {
        const { rows, fields, rowCount } = result;
        this.cols = fields;
        this.rows = rows;
        this.rowCount = rowCount;
    }
    where(conditions) {
        const { clause, args } = where(conditions);
        this.whereClause = clause;
        this.args = args;
        return this;
    }
    fields(list) {
        this.columns = list;
        return this;
    }
    value() {
        this.mode = MODE_VALUE;
        return this;
    }
    row() {
        this.mode = MODE_ROW;
        return this;
    }
    col(name) { // TODO: name
        this.columnName = name;
        this.mode = MODE_COL;
        return this;
    }
    count() {
        this.mode = MODE_COUNT;
        return this;
    }
    then(callback) {
        // TODO: store callback to pool
        const { table, columns, whereClause, args } = this;
        const fields = columns.join(', ');
        let sql = `SELECT ${fields} FROM ${table}`;
        if (whereClause) sql += ` WHERE ${whereClause}`;
        this.database.query(sql, args, (err, result) => {
            this.resolve(result);
            switch (this.mode) {
                case MODE_VALUE:
                    const col = this.cols[0];
                    const row = this.rows[0];
                    callback(row[col.name]);
                    break;
                case MODE_ROW: callback(this.rows[0]);
                    break;
                case MODE_COL: // TODO: implement extract column
                    break;
                case MODE_COUNT: callback(this.rowCount);
                    break;
                default: callback(this.rows);
            }
        });
        return this;
    }
};

class Database {
    constructor(config, logger) {
        this.pool = new Pool(config);
        this.logger = logger;
        this.config = config;
    }

    query(sql, values, callback) {
        if (typeof values === 'function') {
            callback = values;
            values = [];
        }
        const startTime = new Date().getTime();
        console.dir({ sql, values });
        this.pool.query(sql, values, (err, result) => {
            const endTime = new Date().getTime();
            const duration = endTime - startTime;
            console.log(`Execution time: ${duration}ms`);
            if (callback) callback(err, result);
        });
    }

    select(table) {
        return new Cursor(this, table);
    }

    close() {
        this.pool.end();
    }
};

module.exports = {
    open: (config, logger) => new Database(config, logger)
};