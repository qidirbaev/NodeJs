'use strict';

const sum = (a, b) => new Promise((resolve, reject) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        reject(new Error('Arguments must be numbers'));
    } else {
        resolve(a + b);
    }
});

process.on('unhandledRejection', err => console.error({ messageUnhandledRejection: err.message }));

sum(2, '1')
    .then(data => console.log({ data }));