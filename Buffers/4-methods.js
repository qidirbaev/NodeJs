'use strict';

const buffer = Buffer.from('Begzat Kidirbaev, Бегзат Кидирбаев');

if (buffer.includes('Begzat')) {
    console.log(`Begzat is in the ${buffer.toString()}`);
}

const k = buffer.indexOf('Бегзат');

console.log(`Бегзат is in the ${buffer.toString()} at index ${k}`);

console.log(`Slice 3-5 is ${buffer.slice(3, 5)}`);