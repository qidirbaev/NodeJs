'use strict';

const dns = require('dns');

const options = {
    all: true,
    family: 6,
    hints: dns.ADDRCONFIG | dns.V4MAPPED
};

dns.lookup('google.com', options, (err, address, family) => {
    if (err) throw err;
    console.log(`${address.length} resolved to:`);
    console.dir({ address, family });
});