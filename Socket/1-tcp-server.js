'use strict';

const net = require('net');

net.createServer(socket => {
    console.dir(socket.address());

    socket.write('Hello There! 👋\n');

    socket.on('data', data => {
        console.log(`📩: ${data.toString()}`);
        // broadcast to all clients except the sender
        socket.write(`📩: ${data.toString()}`);
    });

    socket.emit('data', 'Hello Everyone! 👋\n');

    socket.on('close', () => {
        console.log(`🔌: ${socket.remoteAddress}:${socket.remotePort}`)
    });

}).listen(7111);
