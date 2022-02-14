"use strict";

const maybe = x => f => maybe(x && f ? f(x) : null);

maybe(5)()(console.log);
console.log();
maybe(4)(x => ++x)(console.log);
console.log();
maybe(3)(x => x * 2)(console.log);
console.log();
maybe(null)(x => x * 2)(console.log);
console.log();
maybe(1)(x => x * 2)(x => ++x)(console.log);