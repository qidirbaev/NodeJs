'use strict';

const http = require('http');
const Client = require('./client.js');
const Session = require('./session.js');

const routing = {
    '/': async client => '<h1>Welcome to HomePage</h1>',
    '/start': async client => {
        Session.start(client);
        return `Session token is ${client.token}`;
    },
    '/destroy': async client => {
        const result = `Session destroyed: ${client.token}`;
        Session.delete(client);
        return result;
    },
    '/api/method1': async client => {
        if (client.session) {
            client.session.result('method1', 'called');
            return { data: 'example data' };
        } else {
            return { data: 'access denied' };
        }
    },
    '/api/method2': async client => ({
        url: client.req.url,
        headers: client.req.headers
    }),
    '/api/method3': async client => {
        if (client.session) {
            return client.session.entries().map((key, value) => {
                return `<b>${key}</b>: ${value}<br>`;
            }).join();
        } 
        return 'No session found';
    }
};

const types = {
    object: JSON.stringify,
    string: str => str,
    number: num => num.toString(),
    undefined: () => 'undefined',
};

http.createServer((req, res) => {
    const client = new Client(req, res);
    const { method, url, headers } = req;
    console.log(`${method} ${url} ${headers}`);

    const handler = routing[url];
    res.on('finish', () => {
        if (client.session) client.session.save()
    });
    if (handler) {
        handler(client)
            .then(data => {
                const type = typeof data;
                const serializer = types[type];
                const result = serializer(data);
                client.sendCookie();
                res.end(result);
            }, err => {
                res.statusCode = 500;
                res.end('Internal server Error 500');
            });
        return;
    }
    res.statusCode = 404;
    res.end('Not found 404');
}).listen(3000);