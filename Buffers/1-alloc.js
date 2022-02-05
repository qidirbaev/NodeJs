'use strict';

const b1 = Buffer.alloc(10);
b1.write('hello world');
console.log(b1);

console.log(b1.toString());

const b2 = Buffer.allocUnsafe(512);
console.log(b2);
console.log(b2.toString());