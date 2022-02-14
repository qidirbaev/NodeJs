"use strict";
function maybe(x) {
    console.log({ x });
    return function(f) {
        console.log({ x, f: f?.toString() });
        return maybe(x && f ? f(x) : null);
    };
}

// Usage:       [native code] - console.log function

maybe(5)()(console.log);
console.log();
maybe(4)(x => ++x)(console.log);
console.log();
maybe(3)(x => x * 2)(console.log);
console.log();
maybe(null)(x => x * 2)(console.log);
console.log();
maybe(1)(x => x * 2)(x => ++x)(console.log);
