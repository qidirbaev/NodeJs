'use strict';

const dgram = require('dgram');

const message = Buffer.from('Hello, world!');
const client = dgram.createSocket('udp4');

client.send(message, 7111, '127.0.0.1', err => {
    if (err) throw err;
    else console.log('Message sent.');
});