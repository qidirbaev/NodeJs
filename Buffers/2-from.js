'use strict';

const b1 = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(b1);

const b2 = Buffer.from('hello world, Привет мир, Сәлем Әлем');

console.log(`hex ${b2.toString('hex')}`);
console.log(`base64 ${b2.toString('base64')}`);
console.log(`utf8 ${b2.toString('utf8')}`);
console.log(`ascii ${b2.toString('ascii')}`);
console.log(`binary ${b2.toString('binary')}`);
console.log(`ucs2 ${b2.toString('ucs2')}`);
console.log(`utf16le ${b2.toString('utf16le')}`);
console.log(`latin1 ${b2.toString('latin1')}`);
