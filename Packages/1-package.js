'use strict';

const p1 = require('./Package');
const p2 = require('./Package/');
const p3 = require('./Package/.');
const m1 = require('./Package/main');
const m2 = require('./Package/main.js');
const u1 = require('./Package/utils');
const u2 = require('./Package/utils.js');
const j1 = require('./Package/package');
const j2 = require('./Package/package.json');

console.log({ p1, p2, p3, m1, m2, u1, u2, j1, j2 });