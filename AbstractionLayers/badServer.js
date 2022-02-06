'use strict';

// Dependencies
const http = require('http');
const fs = require('fs');

// Cache
const cache = {};

// HTTP server
http.createServer((req, res) => {

    // Parse cookies
    const cookies = {};
    const cookie = req.headers.cookie;
    if (cookie) {
        cookie.split(';').forEach(c => {
            const parts = c.split('=');
            cookies[parts.shift().trim()] = (parts[1] || '').trim();
        });
    }

    // Logging
    const date = new Date().toISOString();
    console.log(`${date} ${req.method} ${req.url}`);

    // Serve from cache
    if (cache[req.url] && req.method === 'GET') {
        res.writeHead(200).end(cache[req.url]);
    } else {
        // Routings
        if (req.url === '/') {
            if (req.method === 'GET') {
                res.writeHead(200, {
                    'Set-Cookie': 'foo=bar',
                    'Content-Type': 'text/html'
                });
                const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                res.write(`<h1>Hello, ${ip}</h1>`);
                res.end(`<pre>${JSON.stringify(cookies)}</pre>`);
            }
        } else if (req.url === '/person') {
            if (req.method === 'GET') {
                // Some business logic
                fs.readFile('./person.json', (err, data) => {
                    if (!err) {
                        const obj = JSON.parse(data);
                        obj.birth = new Date(obj.birth);
                        const difference = new Date() - obj.birth;
                        delete obj.birth;
                        const sobj = JSON.stringify(obj);
                        cache[req.url] = sobj;

                        // HTTP reply
                        res.writeHead(200).end(sobj);
                    } else {
                        res.writeHead(500).end('Read error');
                    }
                });
            } else if (req.method === 'POST') {
                
                // Recieving POST data
                const body = [];
                req
                    .on('data', chunk => body.push(chunk))
                    .on('end', () => {
                        let data = Buffer.concat(body).toString();
                        const obj = JSON.parse(data);
                        if (obj.name) obj.name = obj.name.trim();
                        data = JSON.stringify(obj);
                        cache[req.url] = data;
                        fs.writeFile('./person.json', data, err => {
                            if (!err) res.writeHead(200).end('File saved');
                            else res.writeHead(500).end('Write error');
                        });
                    });
            }
        } else {
            res.writeHead(404).end('Not found');
        }
    }
}).listen(8080);