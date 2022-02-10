'use strict';

const http = require('http');

const users = {
    john: { name: 'John', city: 'New York', age: 30 },
    dohn: { name: 'Dohn', city: 'Paris', age: 25 }
};

const routing = {
    '/api/user': name => name ? users[name] : users,
    '/api/userAge': name => users[name].age
};

http.createServer((req, res) => {
    const url = req.url.split('/');
    const par = url.pop();
    const method = routing[url.join('/')];
    const result = method ? method(par) : { error: 'Not found' };
    res.end(JSON.stringify(result));
}).listen(3000, () => console.log('Server started on port 3000'));