'use strict';

const fs = require('fs');

const files = ['./1-readFileSync.js', './n-untitled.js', './3-async.js'];
const stats = new Array(files.length);
const maxIndex = files.length - 1;

const printResults = () => {
    console.dir({ stats });
};

files.forEach((file, index) => {
    console.dir({ file, index });
    fs.lstat(file, (err, stat) => {
        if (err) {
            console.log(`File ${file} not found`);
        } else {
            stats[index] = stat;
        }
        if (index === maxIndex) printResults();
    });
});