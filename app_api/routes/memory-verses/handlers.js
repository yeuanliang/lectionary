'use strict';

const MemoryVerses = require('../../data/memory-verses.js');

const internals = {};

internals.getMemoryVerses = function (request, h) {

    return MemoryVerses[request.query.book];
};

module.exports = internals;
