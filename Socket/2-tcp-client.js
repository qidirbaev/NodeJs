'use strict';

const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const socket = new net.Socket();

socket.on('data', data => {
    console.log(`📩: ${data}`);
});

// waiter function
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const send = () => {
    rl.question('📨: ', async answer => {
        socket.write(answer);
        await wait(2000);
        send();
    });
};

socket.connect({
    port: 7111,
    host: '127.0.0.1'
}, () => {
    console.log(`🔌: ${socket.remoteAddress}:${socket.remotePort}`);

    wait(2000).then(() => send());
});