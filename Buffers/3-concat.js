'use strict';

// Hello world ascii array
const b1 = Buffer.from([65, 53, 77, 15, 91, 13, 10]);
const b2 = Buffer.from([56, 57, 58]);

const b3 = Buffer.alloc(10).fill('A');

const buffer = Buffer.concat([b1, b2, b3]);

console.log(buffer);
console.log(buffer.toString());