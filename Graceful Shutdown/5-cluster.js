"use strict";

const cluster = require("cluster");
const http = require("http");

const connections = new Map();
let server = null;
let child = null;

const SERVER_PORT = 3000;
const LONG_RESPONSE_TIME = 10000;
const SHUTDOWN_TIMEOUT = 5000;
const HTTP_REFRESH = {
    "Content-Type": "text/html",
    "Refresh": "5"
};

const timout = msec => new Promise(resolve => setTimeout(resolve, msec));

const start = () => {
    console.log("Fork process");
    child = cluster.fork("./5-cluster.js");
    child.on("message", message => {
        if (message.status === "restarted") {
            console.log("Restart worker");
            start();
        }
    });
};

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
    process.send({ status: "restarted" });
    server.close(err => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        process.exit(0);
    });
    await timout(SHUTDOWN_TIMEOUT);
    await freeResources();
    await closeSockets();
};

if (cluster.isMaster) {
    start();

    process.on("SIGINT", async () => {
        child.send({ status: "restart" });
    });
} else {
    server = http.createServer((req, res) => {
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
        console.log(`Process ${process.pid} listening on port ${SERVER_PORT}`);
    });

    server.on("listening", () => {
        console.log("Attach to HTTP listener");
    });

    process.on("message", async message => {
        if (message.status === "restart") {
            console.log();
            console.log("Graceful shutdown");
            showSockets();
            await gracefulShutdown();
            showSockets();
            console.log("Worker exited");
        }
    });

    process.on("SIGINT", () => {
        console.log("Gracefully shutting down from SIGINT (Ctrl-C)");
    });
}