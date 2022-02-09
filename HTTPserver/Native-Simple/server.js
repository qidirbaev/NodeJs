'use strict';

const http = require('http');

const user = { name: 'John', city: 'New York', age: 25 };

const routing = {
    '/': '<h1>Home</h1><hr>', // static type
    '/user': user, // linker type
    '/user/name': () => user.name.toUpperCase(), // functional type
    '/user/city': () => user.city.toUpperCase(),
    '/user/age': () => user.age,
    '/hello': { message: 'Hello World', array: [1, 2, 3] },
    '/api/method1': (req, res) => {
        console.log(`Method1: ${req.url} ${req.method}`);
        return { status: res.statusCode, message: 'Method1' };
    },
    '/api/method2': req => ({
        user,
        url: req.url,
        cookies: req.headers.cookie,
    }),
};

const types = {
    object: JSON.stringify,
    string: str => str,
    number: n => n.toString(),
    undefined: () => 'not found',
    function: (fn, req, res) => JSON.stringify(fn(req, res))
};

http.createServer((req, res) => {
    const data = routing[req.url];      // data = req => { ... }  :  method2
    const type = typeof data;        // type = 'function'
    const serializer = types[type];  // serializer = (fn, req, res) => JSON.stringify(fn(req, res))
    const result = serializer(data, req, res);  // result = serializer(req => { ... }, req, res)
    res.end(result);            // send data
}).listen(3000);

// http.createServer((req, res) => {
//     const data = routing[req.url];
//     res.end(types[typeof data](data, req, res));
// }).listen(3000);

setInterval(() => user.age++, 2000);