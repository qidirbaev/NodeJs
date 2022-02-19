"use strict";

const arrayBuffer = new ArrayBuffer(10);

console.dir(arrayBuffer);
console.log(arrayBuffer.byteLength);
console.log(typeof arrayBuffer);
console.log(arrayBuffer instanceof ArrayBuffer);
console.log(Object.getPrototypeOf(arrayBuffer).constructor.name);

const ui8a = new Uint8Array();
console.log(ArrayBuffer.isView(ui8a));