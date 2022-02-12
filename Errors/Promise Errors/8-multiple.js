'use strict';

const sum = (a, b) => new Promise((resolve, reject) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        reject(new Error('Arguments must be numbers'));
        reject(new Error('Arguments must be numbers'));
        reject(new Error('Arguments must be numbers'));
    } else {
        resolve(a + b);
        resolve(a + b);
    }
});

process.on('multipleResolves', (type, promise, reason) => {
    console.log({ multipleResolve: { type, promise, reason } });
});

sum(2, /1/)
    .then(data => console.log({ data }));
