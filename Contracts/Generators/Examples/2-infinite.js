'use strict';

// Infinite Iterator

function* infinite() {
    let index = 0;
    while(true) {
        yield index++;
    }
};

const iter = infinite();

setInterval(() => {
    console.log(iter.next());
}, 1000);