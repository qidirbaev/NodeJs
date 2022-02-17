"use strict";

const Enum = (...values) => class {
    constructor(arg) {
        if (typeof arg === 'number') {
            this.value = (arg > 0 && arg <= values.length) ? arg : undefined;
            return;
        }
        const value = values.indexOf(arg);
        this.value = (!!~value) ? value + 1 : undefined;
    }
    [Symbol.toPrimitive](hint) {
        return (hint === 'number') ? this.value : values[this.value - 1];
    }
};

const Month = Enum(
    "January", "February", "March", "April", "May", "June", "July"
);

const neg = new Month(-1);
const zero = new Month(0);
const first = new Month(1);
const May = new Month("May");
const next = new Month(8);
const unkwown = new Month("Hello");

console.dir({ neg, zero, first, May, next, unkwown });
