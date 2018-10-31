'use strict';

const AdventJS = require('advent-js');
const Moment = require('moment');
const SundayCollects = require('../../data/sunday-collects.js');
const Utils = require('../../utils/utils.js');

const internals = {};

internals.getSundayCollect = function (request, h) {

    const date = Utils.getToday();
    const theDay = Moment(date);
    const theYear = Utils.startYear(date);
    const yearSeries = Utils.yearSeries(theYear).toLocaleLowerCase();
    const adventSunday = AdventJS.adventSunday(theYear);
    const nextAdventSunday = AdventJS.adventSunday(theYear + 1);
    const sundaysInfoOfOneYear = Utils.sundaysInfoOfOneYearSeries(theYear);
    const sundaysInfoOfThreeYear = Utils.sundaysInfoOfThreeYearSeries(theYear);
    let pentecostIndex = 0;
    for (let i = 0; i < sundaysInfoOfOneYear.length; ++i){
        if (sundaysInfoOfOneYear[i].sign === 'pentecost'){
            pentecostIndex = i;
            break;
        }
    }

    const weekIndex = ~~((theDay.diff(adventSunday,'days') + 6 ) / 7);
    const sundayCollect = {
        'oneYear':{},
        'threeYear':{}
    };
    if (nextAdventSunday.diff(theDay,'days') > 6){
        if (weekIndex > pentecostIndex + 1){
            sundayCollect.oneYear = sundaysInfoOfOneYear[weekIndex];
            sundayCollect.oneYear.collect = SundayCollects.different.one[sundaysInfoOfOneYear[weekIndex].sign];
            sundayCollect.threeYear = sundaysInfoOfThreeYear[weekIndex];
            sundayCollect.threeYear.collect = SundayCollects.different[yearSeries][sundaysInfoOfThreeYear[weekIndex].sign];
        }
        else if (sundaysInfoOfOneYear[weekIndex].sign === 'easter4'){
            sundayCollect.oneYear = sundaysInfoOfOneYear[weekIndex];
            sundayCollect.oneYear.collect = SundayCollects.same.easter4_one;
            sundayCollect.threeYear = sundaysInfoOfThreeYear[weekIndex];
            sundayCollect.threeYear.collect = SundayCollects.same.easter4_three;
        }
        else {
            sundayCollect.oneYear = sundaysInfoOfOneYear[weekIndex];
            sundayCollect.oneYear.collect = SundayCollects.same[sundaysInfoOfOneYear[weekIndex].sign];
            sundayCollect.threeYear = sundaysInfoOfThreeYear[weekIndex];
            sundayCollect.threeYear.collect = SundayCollects.same[sundaysInfoOfThreeYear[weekIndex].sign];
        }
    }
    else {
        sundayCollect.oneYear = Utils.sundaysInfoOfOneYearSeries(theYear + 1)[0];
        sundayCollect.oneYear.collect = SundayCollects.same.advent1;
        sundayCollect.threeYear = Utils.sundaysInfoOfThreeYearSeries(theYear + 1)[0];
        sundayCollect.threeYear.collect = SundayCollects.same.advent1;
    }

    return sundayCollect;
};

module.exports = internals;
