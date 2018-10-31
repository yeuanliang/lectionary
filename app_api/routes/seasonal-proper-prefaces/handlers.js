'use strict';

const ProperPrefaces = require('../../data/seasonal-proper-prefaces.js');

const internals = {};

internals.getProperPrefaces = function (request, h) {

    return ProperPrefaces;
};

module.exports = internals;
