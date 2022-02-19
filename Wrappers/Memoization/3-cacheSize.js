"use strict";

const argKey = x => x.toString() + ':' + typeof x;
const generateKey = args => args.map(argKey).join('|');
const CACHE_LENGTH = 3;

const memoize = f => {
    const cache = new Map();
    return (...args) => {
        const key = generateKey(args);
        console.log(`${f.name}(${key}) call`);
        if (cache.has(key)) return cache.get(key);
        console.log(`max(${key}) calculate`);
        const result = f(...args);
        if (cache.size >= CACHE_LENGTH) {
            const firstKey = cache.keys().next().value;
            console.log(`Delete key ${firstKey}`);
            cache.delete(firstKey);
        }
        cache.set(key, result);
        console.dir({ cache });
        return result;
    };
};

// Usage:

const max = (a, b) => a > b ? a : b;

const mMax = memoize(max, 3);

mMax(10, 8);
mMax(10, 8);
mMax(1, 15);
mMax(10, 3);
mMax(15, 2);
mMax(1, 15);
mMax(10, 8);
mMax(0, 0);
mMax(0, 0);