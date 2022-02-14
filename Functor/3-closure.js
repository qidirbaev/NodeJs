"use strict";
let outer_called = 0, inner_called = 0;
function maybe(x) {
    outer_called++;
    console.log({ x });
    return function(f) {
        inner_called++;
        console.log({ x, f });
        return maybe(x && f ? f(x) : null);
    };
}

// How it works:

const maybe5 = maybe(5);
// console.log(`maybe(5).toString(): `, maybe5.toString());
const maybe5f = maybe5(x => ++x);
// console.log(`maybe(5)(x => ++x).toString(): `, maybe5f.toString());
const maybe5fc = maybe5f(console.log);
// console.log(`maybe(5)(x => ++x)(console.log).toString(): `, maybe5fc.toString());
console.log({ outer_called, inner_called });

/*
    +-----------------------------------+---------------+
    |             maybe(5)              |  First Call   |
    +-----------------------------------+---------------+
    |        maybe(5)(x => ++x)         |  Second Call  |
    +-----------------------------------+---------------+
    |  maybe(5)(x => ++x)(console.log)  |  Third Call   |
    +-----------------------------------+---------------+

--->>------>>-------->>----------->>
    maybe(5) ---------------------------------[x = 5][f = ]
            (x => ++x)
                      (console.log)
*/

/* 
    [x = 5]:
        maybe(5) = f => maybe(x && f ? f(5) : null)
        maybe(5)(x => ++x) = maybe(x && f ? f(5) : null)
        maybe(5)(x => ++x)()
        maybe(5)() = maybe(null)
    [x = null]:
        maybe(null) = f => maybe(x && f ? f(x) : null)
        maybe(null)(x => x * 2) = maybe(null) = f => maybe(x && f ? f(x) : null)
        maybe(null)(x => x * 2)(console.log) = 
*/

// Usage:

// maybe(5)()(console.log);
// maybe(4)(x => ++x)(console.log);
// maybe(3)(x => x * 2)(console.log);
// maybe(null)(x => x * 2)(console.log);
// maybe(1)(x => x * 2)(x => ++x)(console.log);
