'use strict';

const fs = require('fs');

const files = ['./1-readFileSync.js', './n-untitled.js', './3-async.js'];
const stats = new Array(files.length);
const maxIndex = files.length - 1;

const printResults = () => console.dir({ stats });

const addToStats = (file, index, err, stat) => {
    err
        ? console.log(`File ${file} not found`)
        : stats[index] = stat;

    if (index === maxIndex) printResults();
};

const iterate = (file, index) => {
    console.dir({ file, index });
    const cb = addToStats.bind(null, file, index);
    fs.lstat(file, cb);
};

files.forEach(iterate);