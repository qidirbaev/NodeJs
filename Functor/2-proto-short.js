"use strict";

function Maybe(x) {
  this.x = x;
};

Maybe.prototype.map = function(f) {
    return new Maybe(this.x && f ? f(this.x) : null);
};

// Usage:
new Maybe(1).map().map(console.log);
new Maybe(4).map(x => x * 4).map(console.log);
new Maybe(null).map(x => x * 4).map(console.log);
