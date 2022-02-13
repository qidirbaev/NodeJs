'use strict';

function* counter(begin, end, delta = 1) {
    let value = begin;
    while (end > value) {
        value += delta;
        if (value > end) return;
        yield value;
    }
};

const c = counter(0, 30, 3);
const val1 = c.next();
const val2 = c.next();
const val3 = c.next();
const val4 = c.next();
const val5 = c.next();
const val6 = c.next();
const val7 = c.next();

console.dir({ c, val1, val2, val3, val4, val5, val6, val7 });