"use strict";

console.clear();

let buffer = new ArrayBuffer(16);

let dv1 = new DataView(buffer);
let dv2 = new DataView(buffer, 10, 3);

dv1.setInt8(11, 298);
let num = dv2.getInt8(1);

console.dir({ buffer, dv1, dv2, num });