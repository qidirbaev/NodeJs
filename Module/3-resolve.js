'use strict';

const expPath = require.resolve('./1-export.js');
const exp = require(expPath);
const expModule = require.cache[expPath];
console.log({ exp, expPath, 'A is ': expModule.exports.fn('A') });

const events = require('events');
const eventsPath = require.resolve('events');
const eventsModule = require.cache[eventsPath];
console.log({ events, eventsPath, eventsModule });

console.dir({ cachedModules: Object.keys(require.cache) });
