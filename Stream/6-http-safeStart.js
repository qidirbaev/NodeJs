// Performance [Pro]

'use strict';

const fs = require('fs');
const zlib = require('zlib');
const http = require('http');

const prepareCache = callback => {
    let buffer = null;

    const rs = fs.createReadStream('./index.html', 'utf8');
    const gs = zlib.createGzip();
    
    const buffers = [];

    gs.on('data', (chunk) => {
        buffers.push(chunk);
    });

    gs.once('end', () => {
        buffer = Buffer.concat(buffers);
        if (callback) {
            callback(null, buffer);
            callback = null;
        }
    });

    rs.on('error', (err) => {
        if (callback) {
            callback(err);
            callback = null;
        }
    });

    gs.on('error', (err) => {
        if (callback) {
            callback(err);
            callback = null;
        }
    });

    rs.pipe(gs);
}

const startServer = (err, buffer) => {
    if (err) throw err;
    
    const server = http.createServer((req, res) => {
        console.log('Request received from ' + req.url);
        res.writeHead(200, { 'Content-Encoding': 'gzip' });
        res.end(buffer);
    });

    server.listen(8080);
};

prepareCache(startServer);