'use strict';

const sum = (a, b) => new Promise((resolve, reject) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        reject(new Error('Arguments must be numbers'));
    } else {
        resolve(a + b);
    }
});

sum(2, 'A')
    .then(data => {
        console.log(data);
    }, err => {
        console.error({ messageThen1: err.message });
        throw new Error('Ops');
    })
    .catch(err => {
        console.error({ messageThen2: err.message });
        throw new Error('Oops');
    })
    .then(() => {}, err => {
        console.error({ messageThen3: err.message });
        throw new Error('Ooops');
    })
    .catch(err => {
        console.error({ messageThen4: err.message });
    });