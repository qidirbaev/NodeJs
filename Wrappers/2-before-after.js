"use strict";

const wrap = (before, after, f) => (...args) => after(f(...before(...args)));
const log = console.log;
const dir = console.dir;
// Usage:

const f = (p1, p2) => (dir({ method: { p1, p2 } }), [p1, p2]);

const before = (...args) => (log("before"), args);

const  after = (...args) => (log("after"), args);

const wrapped = wrap(before, after, f)("Urim", "Thum");

dir({ f_length: f.length,  w_length: wrapped.length });
