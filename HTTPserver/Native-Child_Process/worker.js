'use strict';

const http = require('http');

const BASE_PORT = 3000;

const pid = process.pid;
const id = parseInt(process.argv[2], 10);
const port = BASE_PORT + id - 1;

const user = { name: 'John', age: 22 };

const routing = {
	'/': 'Welcome to HomePage',
	'/user': user,
	'/user/name': () => user.name,
	'/user/age': () => user.age
};

const types = {
	object: JSON.stringify,
	string: str => str,
	number: num => num,
	undefined: () => 'Not Found',
	function: (fn, par, client) => JSON.stringify(fn(client, par))
};

console.log(`Worker: ${id}, pid: ${pid}, port: ${port}`);
	
http.createServer((req, res) => {
	const data = routing[req.url];
	const type = typeof data;
	const serializer = types[type];
	res.setHeader('Process-Id', pid);
	res.end(seralizer(data, req, res));
}).listen(port);


setInterval(() => user.age++, 2000);
