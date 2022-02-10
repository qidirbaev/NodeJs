'use strict';

const http = require('http');
const Client = require('./client.js');
const Session = require('./session.js');

const routing = {
    '/': async client => '<h1>Welcome to HomePage</h1>',
    '/start': async client => {
        Session.start(client);
        return `<pre>Session token is <b>${client.token}</b></pre>`;
    },
    '/destroy': async client => {
        const result = `Session destroyed: ${client.token}`;
        Session.delete(client);
        return result;
    },
    '/api/method1': async client => {
        if (client.session) {
            console.log('method1', 'called');
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
            const sessions = client.session.entries().map((key, value) => {
                return `<b>${key}</b>: ${value}<br>`;
            }).join('');
            console.log({ sessions });
            return `<h1>Sessions</h1><pre>${sessions}</pre>`;
        } 
        return 'No session found';
    }
};

const types = {
    object: JSON.stringify,
    string: str => str,
    number: num => num.toString(),
    undefined: () => 'Not found'
};

// clear console
process.stdout.write('\x1B[2J\x1B[0f');

http.createServer(async (req, res) => {
    const client = await new Client.getInstance(req, res);
    const { method, url } = req;
    console.log(`${method} ${url} ${client.token}`);

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
}).listen(3000, () => console.log('Server started'));
