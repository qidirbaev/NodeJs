'use strict';

require('./1-export.js');

global.entities = { table: 1 };

class Entity {};

const fn = x => x;

const collection = new Map();

module.exports = { Entity, fn, collection };