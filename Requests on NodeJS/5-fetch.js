'use strict';

const fs = require('fs');
const http = require('http');

const index = fs.readFileSync(`${__dirname}/5-fetch.html`);
const person = { name: 'John', age: 30 };
const data = JSON.stringify(person);

http.createServer((req, res) => {
    res.end(req.url === '/person' ? data : index);
}).listen(3000, () => console.log('Server started on port 3000'));