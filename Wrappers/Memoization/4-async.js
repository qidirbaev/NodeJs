"use strict";

const fs = require('fs');

const FILE_PATH = 'data/file.txt';

/**
 * @param {args[0]} key
 * @param {args[args.length - 1]} callback
 * @returns {void}
**/

const memoizeAsync = (lib, fName) => {
    const f = lib[fName];
    const cache = {};
    console.log('override', fName);
    lib[fName] = (...args) => {
        console.dir({ call: fName, args, cache });
        const cb = args.pop();
        const key = args[0];
        const record = cache[key];
        console.log('key:', key);
        console.log('cached:', record);
        if (record) {
            console.log('from cache');
            cb(record.err, record.data);
            return;
        }
        f(...args, (err, data) => {
            console.log('from file');
            console.log('Save key:', key);
            cache[key] = { err, data };
            console.dir({ cache });
            cb(err, data);
        });
    };
};

// Usage:

memoizeAsync(fs, 'readFile');

fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    console.log('data length:', data?.length);
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        console.log('data.length:', data?.length);
    });
});
