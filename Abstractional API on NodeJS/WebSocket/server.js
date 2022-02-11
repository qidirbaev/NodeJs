'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const WebSocket = require('websocket').server;

global.memory = new Map();
const api = new Map();

const apiPath = './api/';

const cacheFile = name => {
    const filePath = apiPath + name;
    const key = path.basename(filePath, '.js');
    try {
        const libPath = require.resolve(filePath);
        delete require.cache(libPath);
    } catch (e) {
        console.log(e);
        return;
    }
    try {
        const method = require(filePath);
        api.set(key, method);
    } catch (e) {
        console.log(e);
        return;
    }
};

const cacheFolder = path => {
    fs.readdir(path, (err, files) => {
        if (err) return;
        files.forEach(cacheFile);
    });
};

const watch = path => {
    fs.watch(path, (event, file) => {
        cacheFile(file);
    });
};

cacheFolder(apiPath);
watch(apiPath);

setTimeout(() => {
    console.dir({ api });
}, 1000);

const server = http.createServer(async (req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url;
    const [s, folder, file] = url.split('/');
    const path = `./static/${folder}`;

    try {
        const data = await fs.promises.readFile(path);
        res.end(data);
    } catch (e) {
        console.dir({ e });
        res.statusCode = 404;
        res.end('File is not found');
    }

}).listen(8080, () => console.log('Server started on port 8080'));

const ws = new WebSocket({
    httpServer: server,
    autoAcceptConnections: false
});

ws.on('request', req => {
    const connection = req.accept('', req.origin);
    console.log('Connected ' + connection.remoteAddress);

    connection.on('message', async message => {
        const dataName = message.type + 'Data';
        const data = message[dataName];
        console.log('Received: ' + data);
        const obj = JSON.parse(data);
        const { methodName, args } = obj;
        const method = api.get(methodName);

        try {
            const result = await method(...args);
            if (!result) {
                connection.send('No result');
                return;
            }
            connection.send(JSON.stringify(result));
        } catch (e) {
            console.dir({ e });
            res.statusCode = 500;
            connection.send({ e });
            res.end('Server error');
        }
    });
});