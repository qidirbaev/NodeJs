'use strict';

function* generator() {
    yield 1;
    yield 2;
    yield 3;
};

const iter = generator();

setInterval(() => {
    console.log(iter.next());
}, 1000);