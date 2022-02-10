'use strict';

const fs = require('fs');
const path = require('path');
const v8 = require('v8');

const PATH = `${__dirname}/Sessions`;

const safePath = fn => (token, ...args) => {
    const callback = args[args.length - 1];
    if (typeof token != 'string') return (
        callback || console.error)('Token must be a string');
    
    const fileName = path.join(PATH, token);
    if (!fileName.startsWith(PATH)) return (
        callback || console.error)(new Error('Token is not valid'));
    
    fn(fileName, ...args);
};

// safePath(fs.readFile)('token', 'utf8');

const readSession = safePath(fs.readFile);
const writeSession = safePath(fs.writeFile);
const deleteSession = safePath(fs.unlink);

class Storage extends Map {
    get(key, callback) {
        const value = super.get(key); // for cached value
        if (value) return callback(null, value);
        
        readSession(key, (err, data) => {
            if (err) return callback(err);
            console.log(`Session loaded: ${key}`);
            const session = v8.deserialize(data);
            super.set(key, session);
            callback(null, session);
        });
    }

    save(key) {
        const value = super.get(key);
        if (value) {
            const data = v8.serialize(value);
            writeSession(key, data, () => {
                console.log(`Session saved: ${key}`);
            });
        }
    }

    delete(key) {
        deleteSession(key, () => {
            console.log(`Session deleted: ${key}`);
        });
    }
}

module.exports = Storage;
