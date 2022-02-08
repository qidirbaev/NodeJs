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

// NOTES:

// TCP is a connection-oriented protocol,
// so the server will know who sent the message.

// TCP Client can connect to UDP Server [PROTOCOL_MISMATCH]
// When a client connects to a server,
// the server will create a new socket for the client.
// The server will then listen for data from the client.
