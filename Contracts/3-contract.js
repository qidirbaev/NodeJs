'use strict';

const assert = require('assert');

const compare = (a, b) => {
    assert(typeof a === 'number');
    assert(typeof b === 'number');
    const result = a > b;
    assert(typeof result === 'boolean');
    return result;
};

{
    const result = compare(7, 5);
    console.dir({ result1: result });
}

{
    const result = compare(7, '5');
    console.dir({ result2: result });
}