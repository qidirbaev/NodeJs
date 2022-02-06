'use strict';

const PARSING_TIMEOUT = 1000;
const EXECUTION_TIMEOUT = 5000;

const fs = require('fs');
const vm = require('vm');
const timers = require('timers');
const events = require('events');

const contex = {
    module: {}, console,
    require: name => {
        if (name === 'fs') {
            console.log('Module fs is restricted');
            return null;
        }
        return require(name);
    }
};

contex.global = contex;
const sandbox = vm.createContext(contex);

// Prepare lambda context injection
const api = { timers, events };

// Read an application source code from the file
const fileName = './application.js';
fs.readFile(fileName, 'utf8', (err, src) => {
    // We need to handle errors here

    // Wrap source to lambda, inject api
    src = `api => { ${src} };`;

    // Run an application in sandboxed context
    let script;

    try {
        script = new vm.Script(src, { timeout: PARSING_TIMEOUT });
    } catch (ex) {
        console.dir(ex);
        console.log('Parsing timeout');
        process.exit(1);
    }
    try {
        const f = script.runInNewContext(sandbox, { timeout: EXECUTION_TIMEOUT });
        f(api);
        const exported = sandbox.module.exports;
        console.dir({ exported });
    } catch (ex) {
        console.dir(ex);
        console.log('Execution timeout');
        process.exit(1);
    }

    // We can access a link to exported interface from sandbox.module.exports
    // to execute, save to the cache, print to console, etc.
});

process.on('uncaughtException', err => {
    console.log('Uncaughted exeption: ', err);
});