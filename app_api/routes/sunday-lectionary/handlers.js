'use strict';

const AdventJS = require('advent-js');
const Moment = require('moment');
const SundayLectionary = require('../../data/sunday-lectionary.js');
const FestivalsInfo = require('../../data/reference.js').festivalsInfo;
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
    let weekInfo = '';
    let seriesYear = '';
    if (series === 'one-year') {
        seriesYear = 'one';
        if (nextAdventSunday.diff(theDay,'days') > 6){
            weeks = Utils.sundaysInfoOfOneYearSeries(theYear);
            weekIndex = ~~((theDay.diff(adventSunday,'days') + 6 ) / 7);
            weekInfo = weeks[weekIndex];
        }
        else {
            weeks = Utils.sundaysInfoOfOneYearSeries(theYear + 1);
            weekInfo = weeks[0];
        }
    }
    else if (series === 'special') {
        const name = 'Baptism of Our Lord';
        const lectionary = SundayLectionary.one.baptism;
        return {
            series:'special',
            name,
            lectionary
        };
    }
    else {
        if (nextAdventSunday.diff(theDay,'days') > 6){
            seriesYear = Utils.yearSeries(theYear);
            weeks = Utils.sundaysInfoOfThreeYearSeries(theYear);
            weekIndex = ~~((theDay.diff(adventSunday,'days') + 6 ) / 7);
            weekInfo = weeks[weekIndex];
        }
        else {
            seriesYear = Utils.yearSeries(theYear + 1);
            weeks = Utils.sundaysInfoOfThreeYearSeries(theYear + 1);
            weekInfo = weeks[0];
        }
    }

    return {
        series: seriesYear,
        name: weekInfo.sundayName,
        date: weekInfo.date,
        lectionary: SundayLectionary[seriesYear][weekInfo.sign]
    };
};

internals.getFestivalLectionary = function (request, h) {

    const festival = request.params.festival;
    const date = FestivalsInfo[festival].date;
    const name = FestivalsInfo[festival].name;
    if (festival === 'visitation-3' || festival === 'visitation-1'){
        return {
            series:'festival',
            date,
            name,
            lectionary: SundayLectionary.festival.visitation
        };
    }

    return {
        series:'festival',
        date,
        name,
        lectionary: SundayLectionary.festival[festival]
    };
};

module.exports = internals;
