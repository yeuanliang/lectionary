'use strict';

const AdventJS = require('advent-js');
const Moment = require('moment');
const SundayPropers = require('../../data/propers.js');
const FestivalsInfo = require('../../data/reference.js').festivalsInfo;
const Collects = require('../../data/sunday-collects');
const Utils = require('../../utils/utils.js');

const internals = {};

internals.getSundayPropers = function (request, h) {

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
    let pentecostIndex = 0;
    let weekInfo = '';
    let seriesYear = '';
    let collect = {};
    if (series === 'one-year') {
        seriesYear = 'one';
        if (nextAdventSunday.diff(theDay,'days') > 6){
            weeks = Utils.sundaysInfoOfOneYearSeries(theYear);
            weekIndex = ~~((theDay.diff(adventSunday,'days') + 6 ) / 7);
            weekInfo = weeks[weekIndex];
            for (let i = 0; i < weeks.length; ++i){
                if (weeks[i].sign === 'pentecost'){
                    pentecostIndex = i;
                    break;
                }
            }

            if (weekIndex > pentecostIndex + 1){
                collect = Collects.different[seriesYear][weekInfo.sign];

            }
            else if (weekInfo.sign === 'easter4'){
                collect = Collects.same.easter4_one;
            }
            else {
                collect = Collects.same[weekInfo.sign];
            }
        }
        else {
            weeks = Utils.sundaysInfoOfOneYearSeries(theYear + 1);
            weekInfo = weeks[0];
            collect = Collects.same[weekInfo.sign];
        }
    }
    else if ( series === 'special'){
        return {
            series: 'special',
            name: 'The Baptism of Our Lord',
            collect: Collects.same.baptism,
            propers: SundayPropers.one.baptism
        };
    }
    else {
        if (nextAdventSunday.diff(theDay,'days') > 6){
            seriesYear = Utils.yearSeries(theYear);
            weeks = Utils.sundaysInfoOfThreeYearSeries(theYear);
            weekIndex = ~~((theDay.diff(adventSunday,'days') + 6 ) / 7);
            weekInfo = weeks[weekIndex];
            for (let i = 0; i < weeks.length; ++i){
                if (weeks[i].sign === 'pentecost'){
                    pentecostIndex = i;
                    break;
                }
            }

            if (weekIndex > pentecostIndex + 1){
                collect = Collects.different[seriesYear][weekInfo.sign];
            }
            else if (weekInfo.sign === 'easter4'){
                collect = Collects.same.easter4_three;
            }
            else {
                collect = Collects.same[weekInfo.sign];
            }
        }
        else {
            seriesYear = Utils.yearSeries(theYear + 1);
            weeks = Utils.sundaysInfoOfThreeYearSeries(theYear + 1);
            weekInfo = weeks[0];
            collect = Collects.same[weekInfo.sign];
        }
    }

    return {
        series: seriesYear,
        name: weekInfo.sundayName,
        date: weekInfo.date,
        collect,
        propers: SundayPropers[seriesYear][weekInfo.sign]
    };
};

internals.getFestivalPropers = function (request, h) {

    const festival = request.params.festival;
    const date = FestivalsInfo[festival].date;
    const name = FestivalsInfo[festival].name;
    const propers = SundayPropers.festival[festival];
    return {
        series:'festival',
        date,
        name,
        collect: Collects.same[festival],
        propers
    };
};

module.exports = internals;
