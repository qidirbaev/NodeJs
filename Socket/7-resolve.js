'use strict';

const dns = require('dns');
const hostname = 'github.com';

dns.resolve(hostname, (err, addresses) => {
    if (err) {
        if (err.code === 'ENOTFOUND') {
            console.log(`${hostname} not found.`);
        } else if (err.code === 'ECONNREFUSED') {
            console.log(`${hostname} refused connection.`);
        } else {
            console.log('Whoops! Web server is down');
        }
    } else {
        console.log(`${hostname} resolved to:`);
        console.dir(addresses);
    }
});

dns.resolveAny(hostname, (err, addresses) => {
    if (err) throw err;
    console.log(`${hostname} resolved to:`);
    console.dir({ addresses });
});