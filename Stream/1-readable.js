'use strict';

const fs = require('fs');

const rs = fs.createReadStream('./1-readible.js', 'utf8');

rs.on('readable', () => {
    console.log('\nreadable\n');
    const buffer = rs.read();
    if (buffer) {
        console.log(buffer);
    } else {
        console.log('No more data');
    }
});

rs.on('data', chunk => {
    console.log('\ndata\n');
    console.log(chunk);
});
