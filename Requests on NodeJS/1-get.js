'use strict';

const http = require('http');

const url = "http://www.ietf.org";

http.get(url, res => {
    console.log(res.req._header);
    console.dir(res.headers);
    if (res.statusCode !== 200) {
        const { statusCode, statusMessage } = res;
        console.log(`Status: ${statusCode} ${statusMessage}`);
        return;
    }
    res.setEncoding('utf8');
    const buffer = [];
    res.on('data', chunk => {
        buffer.push(chunk);
    });
    res.on('end', () => {
        console.log(buffer.join('\n'));
    });
}).on('error', err => {
    console.error(err);
});


/*
    Sample code for the HTTP GET request
*/