'use strict';

const http = require('http');
const https = require('https');

const fetch = url => new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, res => {
        if (res.statusCode !== 200) {
            const { statusCode, statusMessage } = res;
            reject(new Error(`Status: ${statusCode} ${statusMessage}`));
        }
        res.setEncoding('utf8');
        const buffer = [];
        res.on('data', chunk => buffer.push(chunk));
        res.on('end', () => resolve(buffer.join()));
    });
});

// Usage:

fetch('https://www.ietf.org/sdfasdfasdfasdfqw3et52345234rdfqwf')
    .then(console.log)
    .catch(console.error);