'use strict';

const fs = require('fs');
const zlib = require('zlib');
const http = require('http');

const rs = fs.createReadStream('./index.html', 'utf8');
const gs = zlib.createGzip();

const buffers = [];
let buffer = null;

gs.on('data', (chunk) => {
    buffers.push(chunk);
});

gs.on('end', () => {
    buffer = Buffer.concat(buffers);
});

rs.pipe(gs);

const server = http.createServer((req, res) => {
    console.log('Request received from ' + req.url);
    res.writeHead(200, { 'Content-Encoding': 'gzip' });
    res.end(buffer);
});

server.listen(8080);