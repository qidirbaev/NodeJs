'use strict';

const net = require('net');

const connection = socket => {

    console.dir({
        remoteAddress: socket.remoteAddress,
        remoteFamily: socket.remoteFamily,
        remotePort: socket.remotePort,
        localAddress: socket.localAddress,
        localPort: socket.localPort,
        bufferSize: socket.bufferSize,
        connecting: socket.connecting,
        destroyed: socket.destroyed
    });

    socket.write('Hello, world!\n');

    socket.on('data', data => {
        console.log('Event: data');
        console.log('Data:', data.toString());
    });

    socket.on('drain', () => {
        console.log('Event: drain');
    });

    socket.on('end', () => {
        console.log('Event: end');
        console.dir({
            bytesRead: socket.bytesRead,
            bytesWritten: socket.bytesWritten
        });
    });

    socket.on('error', error => {
        console.log('Event: error');
        console.dir(error);
    });

    socket.on('lookup', (error, address, family, host) => {
        console.log('Event: lookup');
        console.dir({
            error,
            address,
            family,
            host
        });
    });

    socket.on('timeout', () => {
        console.log('Event: timeout');
    });

    socket.on('connect', () => {
        console.log('Event: connect');
        console.log('Connected to:', socket.remoteAddress, socket.remotePort);
    });
}

const server = net.createServer();

server.on('connection', connection);

server.listen(7111);
