"use strict";

function Maybe(x) {
  this.x = x;
};

Maybe.prototype.map = function(f) {
    return (this.x && f) ?
        new Maybe(f(this.x)) :
        new Maybe(null);
};

// Usage:

new Maybe(1).map(console.log);
new Maybe(4).map(x => x * 4).map(console.log);
new Maybe(null).map(x => x * 4).map(console.log);