"use strict";

const argKey = x => x.toString() + ':' + typeof x;
const generateKey = args => args.map(argKey).join('|');

const memoize = f => {
    const cache = {};
    return (...args) => {
        const key = generateKey(args);
        const val = cache[key];
        if (val) return val;
        const result = f(...args);
        cache[key] = result;
        console.dir({ cache });
        return result;
    };
};

// Usage:
const add = (a, b) => {
    console.log('Calculating sum of', a, 'and', b);
    return a + b;
};

const madd = memoize(add);

console.log('First call mSuqSeq(2, 5)');
console.log('Value: ', madd(2, 5));

console.log('Second call mSuqSeq(2, 5)');
console.log('From cache: ', madd(2, 5));

console.log('Third call mSuqSeq(2, 6)');
console.log('Calculated: ', madd(2, 6));
