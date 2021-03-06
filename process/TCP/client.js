'use strict';

const net = require('net');

const socket = new net.Socket();

socket.connect({
    port: 3000,
    host: '127.0.0.1'
}, () => {
    socket.write('Hello from client');
    socket.on('data', data => {
        const message = data.toString();
        const user = JSON.parse(message);

        console.log('Data recieved (by client): ' + data);
        console.log('toString: ' + message);
        console.log('User: ' + user.name + ' ' + user.age);
    });
});