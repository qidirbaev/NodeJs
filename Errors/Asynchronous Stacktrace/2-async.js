'use strict';

const fs = require('fs');

const f1 = () => {
    setTimeout(() => {
        fs.promises.readFile().catch(err => {
            throw err;
            // console.log('Catch 2', err);
        });
    }, 0);
};

const f2 = async () => f1();
const f3 = async () => f2();

(async () => {
    try {
        f3();
    } catch (e) {
        console.log('Catch 1', e);
    }
})();