"use strict";

const crypto = require('crypto');

const argKey = x => x.toString() + '|' + typeof x;

const generateKey = args => {
    const key = args.map(argKey).join('|');
    return crypto.createHash('sha256').update(key).digest('hex');
};

const memoize = f => {
    const cache = {};
    return (...args) => {
        const key = generateKey(args);
        const val = cache[key];
        if (val) return val;
        const result = f(...args);
        cache[key] = result;
        console.log({ cache });
        return result;
    };
};

// Usage:

const add = (a, b) => (console.log('Calculating:', a, b), a + b);

const madd = memoize(add);

console.log('First call mSuqSeq(2, 5)');
console.log('Value: ', madd(2, 5));

console.log('Second call mSuqSeq(2, 5)');
console.log('From cache: ', madd(2, 5));

console.log('Third call mSuqSeq(2, 6)');
console.log('Calculated: ', madd(2, 6));
