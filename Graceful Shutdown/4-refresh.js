"use strict";

const http = require("http");
const connections = new Map();

const SERVER_PORT = 3000;
const LONG_RESPONSE_TIME = 10000;
const SHUTDOWN_TIMEOUT = 5000;
const HTTP_REFRESH = {
    "Content-Type": "text/html",
    "Refresh": "5"
};

const timout = msec => new Promise(resolve => setTimeout(resolve, msec));

const server = http.createServer((req, res) => {
    console.log("New Request");
    connections.set(res.connection, res);
    setTimeout(() => {
        res.end("Example response");
    }, LONG_RESPONSE_TIME);
});

server.on("connection", socket => {
    console.log("New Connection");
    socket.on("close", () => {
        console.log("Connection Closed");
        connections.delete(socket);
    });
});

server.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
});

const showSockets = () => {
    console.log("Connection: " + connections.size);
    for (const connection of connections.keys()) {
        const { remoteAddress, remotePort } = connection;
        console.log(` ${remoteAddress}:${remotePort}`);
    }
};

const closeSockets = async () => {
    for (const [socket, res] of connections.entries()) {
        connections.delete(socket);
        res.writeHead(503, HTTP_REFRESH);
        res.end("Closing socket");
        socket.end();
    }
};

const freeResources = async () => {
    console.log("Freeing resources");
};

const gracefulShutdown = async () => {
    server.close(err => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    });
    await timout(SHUTDOWN_TIMEOUT);
    await freeResources();
    await closeSockets();
};

process.on("SIGINT", async () => {
    console.log();
    console.log("Gracefully shutting down from SIGINT (Ctrl-C)");
    showSockets();
    await gracefulShutdown();
    showSockets();
    console.log("Exited");
    process.exit(0);
});