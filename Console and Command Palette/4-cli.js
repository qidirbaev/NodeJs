'use strict';

console.dir({
    currentDirectory: process.cwd(),
    processId: process.pid,
    platform: process.platform,
    release: process.release,
    title: process.title,
    uptime: process.uptime(),
    nodeVersion: process.version,
    versions: process.versions,
});

console.log('\nCommand line arguments:');
console.dir(process.argv).forEach((arg, index) => {
    console.log(`${index}: ${arg}`);
});

console.log('\nEnvironment variables:');
console.dir(process.env).forEach((value, key) => {
    console.log(`${key}: ${value}`);
});