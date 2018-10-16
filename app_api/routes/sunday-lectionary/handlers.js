'use strict';

const AdventJS = require('advent-js');
const Moment = require('moment');
const SundayLectionary = require('../../data/sunday-lectionary.js');
const Utils = require('../../utils/utils.js');

const internals = {};

internals.getSundayLectionary = function (request, h) {

    const series = request.query.series;
    let date = '';
    if (request.query.date) {
        date = request.query.date;
    }
    else {
        date = Utils.getToday();
    }

    const theDay = Moment(date);
    const theYear = Utils.startYear(date);
    const adventSunday = AdventJS.adventSunday(theYear);
    const nextAdventSunday = AdventJS.adventSunday(theYear + 1);
    let weeks = [];
    let weekIndex = 0;
    let weekName = '';
    let seriesYear = '';
    if (series === 'one-year') {
        seriesYear = 'one';
        if (nextAdventSunday.diff(theDay,'days') > 6){
            weeks = Utils.sundaysOfOneYearSeries(theYear);
            weekIndex = ~~((theDay.diff(adventSunday,'days') + 6 ) / 7);
            weekName = weeks[weekIndex];
        }
        else {
            weeks = Utils.sundaysOfOneYearSeries(theYear + 1);
            weekName = weeks[0];
        }
    }
    else {
        if (nextAdventSunday.diff(theDay,'days') > 6){
            seriesYear = Utils.yearSeries(theYear);
            weeks = Utils.sundaysOfThreeYearsSeries(theYear);
            weekIndex = ~~((theDay.diff(adventSunday,'days') + 6 ) / 7);
            weekName = weeks[weekIndex];
        }
        else {
            seriesYear = Utils.yearSeries(theYear + 1);
            weeks = Utils.sundaysOfThreeYearsSeries(theYear + 1);
            weekName = weeks[0];
        }
    }

    return SundayLectionary[seriesYear][weekName];
};

module.exports = internals;
