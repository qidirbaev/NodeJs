'use strict';

const sum = (a, b) => new Promise((resolve, reject) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        reject(new Error('Arguments must be numbers'));
    } else {
        resolve(a + b);
    }
});

process.on('unhandledRejection', (reason, promise) => {
    console.log({ unhandledRejection: { reason, promise } });
});

process.on('rejectionHandled', promise => {
    console.log({ rejectionHandled: { promise }});
});

const pi = sum(2, '1')
    .then(data => console.log({ data }));

// p1.catch(err => {
//     console.log({ catch1: { err }});
// });

setTimeout(() => {
    pi.catch(err => console.log({ catch2: err }));
}, 0);