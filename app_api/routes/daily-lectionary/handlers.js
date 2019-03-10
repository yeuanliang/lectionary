'use strict';

const AdventJS = require('advent-js');
const Moment = require('moment');
const DailyLectionary = require('../../data/daily-lectionary.js');
const MovableDays = require('../../data/reference').daysMovable;
const Utils = require('../../utils/utils.js');

const internals = {};

internals.getDailyLectionary = function (request, h){

    let date = '';
    if (request.query.date){
        date = request.query.date;
    }
    else {
        date = Utils.getToday();
    }

    const theYear = date.substring(0,4);
    const theday = Moment(date);
    const ashWednesday = AdventJS.ashWednesday(theYear);
    const pentecost = AdventJS.pentecost(theYear);
    const holyTrinity = pentecost.add(7, 'd');
    let dateName = '';
    if (theday >= ashWednesday && theday <= holyTrinity) {
        const index = theday.diff(ashWednesday, 'days');
        dateName = MovableDays[index];
    }
    else {
        dateName = 'day' + theday.format('MM-DD');
    }

    return {
        date,
        lectionary: DailyLectionary[dateName]
    };
};


module.exports = internals;
