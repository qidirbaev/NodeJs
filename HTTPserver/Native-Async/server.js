'use strict';

const http = require('http');

const user = { name: 'John', age: 22 };

const routing = {
	'/': '<h1>Welcome to HomePage</h1>',
	'/user': user,
	'/user/name': () => user.name.toUpperCase(),
	'/user/age': () => user.age,
	'/hello': { message: 'Hello, World', array: [1, 2, 3] },
	'/api/method1': (req, res, callback) => {
		console.log(`${req.url} ${req.statusCOde}`);
		callback({ status: res.statusCode });
	},
	'/api/method2': req => ({
		user,
		url: req.url,
		cookie: req.headers.cookie
	})
};

const types = {
	object: ([data], callback) => callback(JSON.stringify(data)),
	undefined: (args, callback) => callback('Not Found'),
	function: ([fn, req, res], callback) => {
		if (fn.length === 3) fn(req, res, callback);
		else callback(JSON.stringify(fn(req, res)));
	}
};

const serve = (data, req, res) => {
	const type = typeof data;
	if (data === 'string') return res.end(data);
	const serializer = types[type];
	serializer([data, req, res], data => serve(data, req, res));
};

http.createServer((req, res) => {
	const data = routing[req.url];
	serve(data, req, res);
}).listen(3000);

setInterval(() => user.age++, 2000);
