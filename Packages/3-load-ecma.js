'use strict';

const p1 = import('Package3');
const m2 = import('Package3/main.mjs');
const u2 = import('Package3/utils.mjs');

Promise.all([p1, m2, u2]).then(values => {
    console.log({ p1: values[0], m2: values[1], u2: values[2] });
});