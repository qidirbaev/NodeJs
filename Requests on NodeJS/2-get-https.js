'use strict';

const https = require('https');
const fs = require('fs');

const url = 'https://www.ietf.org/2342gfhjfgjhgyjfgjhfgjh39hasudfn';

https.get(url, res => {
    console.log(res.req._header);
    console.dir(res.headers);
    if (res.statusCode !== 200) {
        const { statusCode, statusMessage } = res;
        console.log(`Status: ${statusCode} ${statusMessage}`);
    }
    res.setEncoding('utf8');
    const buffer = [];
    res.on('data', chunk => {
        buffer.push(chunk);
    });
    res.on('end', () => {
        const result = buffer.join();
        console.log({ size: result.length, chunks: buffer.length });
        fs.writeFile('1-get-https_content.html', result, () => {
            console.log('File saved');
        });
    });
}).on('error', err => {
    console.error(err);
});

/*
    Sample code for the HTTPS GET request
*/