'use strict';

const http = require('http');

const ajax = (base, methods) => {
    const api = {};
    for (const method of methods) {
        api[method] = (...args) => {
            const callback = args.pop();
            const url = `${base}${method}/${args.join('/')}`;
            console.dir({ url });
            http.get(url, res => {
                if (res.statusCode !== 200) {
                    callback(new Error(`Status code: ${res.statusCode}`));
                    return;
                }
                const buffer = [];
                res.on('data', chunk => buffer.push(chunk));
                res.on('end', () => callback(null, JSON.parse(buffer.join())));
            });
        }
    }
    return api;
};

// USAGE:

const api = ajax(
    'http://localhost:3000/api/',
    ['user', 'userAge']
);

api.user('john', /* 1, { left: 2018, right: 2022} */ (err, user) => {
    if (err) throw err;
    console.dir({ user });
});

api.userAge('dohn', (err, age) => {
    if (err) throw err;
    console.dir({ age });
});
