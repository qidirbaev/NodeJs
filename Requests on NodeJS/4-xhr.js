'use strict';

const fs = require('fs');
const http = require('http');

const index = fs.readFileSync(__dirname + '/4-xhr.html');

http.createServer(function(req, res) {
    if (req.url === '/person') {
        res.end(JSON.stringify({ name: 'John', age: '25' }));
    } else {
        res.end(index);
    }
}).listen(3000, () => console.log('Listening on port 3000'));