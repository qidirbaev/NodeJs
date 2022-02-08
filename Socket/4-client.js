'use strict';

const net = require('net');

const socket = new net.Socket();

const send = message => {
    console.log('Client > ' + message);
    socket.write(message);
};

socket.on('data', data => {
    console.log('Server > ' + data.toString());
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

socket.on('timeout', () => {
    console.log('Event: timeout');
});

socket.on('connect', () => {
    send('Hello, world!\n');
    send('Again, world!\n');
});

socket.connect({
    port: 7111,
    host: '127.0.0.1'
});