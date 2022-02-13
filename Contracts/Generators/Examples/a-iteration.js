'use strict';

let string = "hi";

let iterator = string[Symbol.iterator]();

setTimeout(() => {
    string += " there";
    iterator = string[Symbol.iterator]();
}, 2500);

setInterval(() => {
    console.log(iterator.next());
}, 500);
