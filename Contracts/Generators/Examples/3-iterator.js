const someSthing = new String('some string');

someSthing[Symbol.iterator] = function () {
    return {
        next: function () {
            return this._first ? {
                value: 'bye',
                done: (this._first = false)
            } : {
                done: true
            }
        },
        _first: true
    };
};

console.log([...someSthing]);
console.log(someSthing + '');