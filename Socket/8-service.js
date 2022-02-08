'use strict';

const dns = require('dns');

const IPv4 = '192.30.253.113';

dns.lookupService(IPv4, 443, (err, hostname, service) => {
    if (err) throw err;
    console.log(`${IPv4} resolved to:`);
    console.dir({ hostname, service });
});