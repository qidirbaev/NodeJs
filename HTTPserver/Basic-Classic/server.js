'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World\n');
});

server.listen(port, hostname, () => {
    console.log(`Serber running at http//${hostname}:${port}/`);
});

server.on('error', err => {
    if (err.code === 'EACCES') {
        console.error(`No access to port: ${port}`);
        process.exit(1);
    } 
});