"use strict";

const now = () => (new Date()).toLocaleTimeString();

const timeout = (ms, f) => {
    let timer = setTimeout(() => {
        if (timer) console.log(`Function timed out at ${now()}`);
        timer = null;
    }, ms);
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
            return f(...args);
        }
    };
};

console.log(`Function will be called at ${now()}`);

setInterval(() => console.log(`Time is: ${now()}`), 1000);

// Usage:

const f = par => console.log(`Function called with: ${par}, at ${now()}`);

const f2000 = timeout(2000, f);
const f4000 = timeout(4000, f);

setTimeout(() => {
    f2000('Urim');
    f4000('Thum');
}, 3000);