'use strict';

const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    console.log(`${rinfo.address}:${rinfo.port} - ${msg}`);
})

server.bind(7111);

// NOTES:

// UDP is a connectionless protocol,
// so the server will not know who sent the message.

// UDP Client can not connect to TCP Server [PROTOCOL_MISMATCH]
// When a client connects to a server,
// the server will create a new socket for the client.
