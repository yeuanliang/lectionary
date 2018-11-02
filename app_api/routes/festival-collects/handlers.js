'use strict';

const SundayCollects = require('../../data/sunday-collects.js');
const FestivalsInfo = require('../../data/reference.js').festivalsInfo;

const internals = {};

internals.getFestivalCollect = function (request, h) {

    const festivals = Object.keys(FestivalsInfo);
    const festivalCollects = FestivalsInfo;
    for (let i = 0; i < festivals.length; ++i){
        festivalCollects[festivals[i]].collect = SundayCollects.same[festivals[i]];
    }

    return festivalCollects;
};

module.exports = internals;
