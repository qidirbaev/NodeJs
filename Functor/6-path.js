"use strict";

const fp = {
    path: data => (
        path => (
            fp.maybe(path)(path => (
                path.split('.').reduce(
                    (prev, key) => (prev[key] || {}),
                    (data || {})
                )
            ))
        )
    ),
    maybe: x => (
        f => (
            fp.maybe(x && f ? f(x) : null)
        )
    )
}

// Usage:
const fs = require("fs");

const config = {
    server: {
        host: {
            ip: "127.0.0.1",
            port: 3000
        },
        ssl: {
            key: {
                fileName: "./6-path.js"
            }
        }
    }
};

// Imperative style

if (
    config &&
    config.server &&
    config.server.ssl &&
    config.server.ssl.key &&
    config.server.ssl.key.fileName
) {
    const fileName = config.server.ssl.key.fileName;
    fs.readFile(fileName, "utf8", (err, data) => {
        if (data) console.log("Imperative style logged");
    });
}

// Modern-Imperative style

{
    const fileName = config?.server?.ssl?.key?.fileName
    if (fileName) {
        fs.readFile(fileName, "utf8", (err, data) => {
            if (data) console.log("Modern-Imperative style logged");
        });
    };
}

// Functional style

fp.path(config)("server.ssl.key.fileName")(
    file => fs.readFile(file, "utf8", (err, data) => {
        fp.maybe(data)(console.log);
    })
);