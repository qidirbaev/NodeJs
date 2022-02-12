'use strict';

const modulePath = require.resolve('./1-export.js');
const exp1 = require(modulePath);
console.log(require.cache[modulePath]);
// delete require.cache[modulePath];
console.log({ cached: require.cache[modulePath] });
const exp2 = require(modulePath);

console.log(exp1 === exp2);
console.log({ exp1, exp2 });
console.log(exp1 === exp2);