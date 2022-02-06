'use strict';

console.log('log');

const obj = {
    name: 'Begzat',
    city: 'Nukus',
    born: 2000,
    children: [
        {
            name: 'A',
            city: 'Nukus',
            born: 2030,
        },
        {
            name: 'B',
            city: 'Tashkent',
            born: 2028,
        }
    ]
};

Object.defineProperty(obj, 'childrenCount', {
    enumerable: false,
    writable: false,
    value: obj.children.length
});

console.log({ obj });

console.dir({ obj });
console.dir({ obj }, { showHidden: true, depth: 20, colors: true });


console.error('Error');

console.time('Loop time');
const arr = [];
for (let i = 0; i < 1000; i++) arr.push(i);
console.timeEnd('Loop time');

console.trace('Trace here');
// throw new Error('Error message');

console.log(Object.keys(console));
// console.clear();