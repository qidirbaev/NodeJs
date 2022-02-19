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

// Utils:

const LOOP_COUNT = 10000;

const speedTest = (name, f, args, count) => {
    const tmp = [];
    const start = new Date().getTime();
    for (let i = 0; i < count; i++) tmp.push(f(...args));
    const end = new Date().getTime();
    const time = end - start;
    console.log(`${name} * ${tmp.length} took ${time}ms`);
};

// Usage:

const fib = n => (n <= 2 ? 1 : fib(n - 1) + fib(n - 2));

speedTest('no cache fib(20)', fib, [20], LOOP_COUNT);

speedTest('no cache fib(20)', fib, [20], 1);

const mFib = memoize(fib);
speedTest('memoized fib(20)', mFib, [20], LOOP_COUNT);