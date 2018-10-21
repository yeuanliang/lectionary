'use strict';

const AdventJS = require('advent-js');
const Moment = require('moment');
const DailyMorningPsalm = require('../../data/daily-morning-psalm.js');
const DailyPsalms = require('../../data/daily-psalms.js');
const Utils = require('../../utils/utils.js');

const internals = {};

internals.getDailyPsalms = function (request, h){

    let date = '';
    if (request.query.date){
        date = request.query.date;
    }
    else {
        date = Utils.getToday();
    }

    const theYear = date.substring(0,4);
    const theday = Moment(date);
    const epiphany = Moment(theYear + '-01-06');
    const adventSunday = AdventJS.adventSunday(theYear);
    const christmas = AdventJS.christmas(theYear);
    const ashWednesday = AdventJS.ashWednesday(theYear);
    const easter = AdventJS.easter(theYear);
    const pentecost = AdventJS.pentecost(theYear);
    const generalDay = function (generalName, momentObject) {

        let startDay = 0;
        let offset = 0;
        let totalWeeks = 0;
        let weekNumber = 0;
        if (generalName === 'firstGeneral') {
            startDay = epiphany.day() + 1;
            offset = momentObject.diff(epiphany, 'days');
            totalWeeks = ~~((startDay + offset) / 7);
        }
        else if (generalName === 'secondGeneral') {
            startDay = 1;
            offset = momentObject.diff(pentecost, 'days');
            totalWeeks = ~~((startDay + offset) / 7);
        }

        weekNumber = totalWeeks % 4 + 1;
        return 'general' + weekNumber + '-' + momentObject.day();
    };

    const dailyPsalms = {
        morningPsalms: [],
        eveningPsalms: []
    };

    dailyPsalms.morningPsalms.push(DailyMorningPsalm[theday.day()]);
    let dayName = '';
    if (theday <= epiphany) {
        dayName = 'day' + theday.format('MM-DD');
    }
    else if (theday > epiphany && theday < ashWednesday) {
        // firstGeneral,  01-07 to the day before Ash Wednesday
        dayName = generalDay('firstGeneral', theday);
    }
    else if (theday >= ashWednesday && theday < easter) {
        // lent: Ash Wednesday to the day before easter
        dayName = 'lent-' + theday.day();
    }
    else if (theday >= easter && theday <= pentecost) {
        // easter: fifty days in length (from Easter Sunday up to and inclusive of Pentecost)
        dayName = 'advent-' + theday.day();
    }
    else if (theday > pentecost && theday < adventSunday) {
        // secondGeneral, the day after Penteost to the end of the liturgical year
        dayName = generalDay('secondGeneral', theday);
    }
    else if (theday > adventSunday && theday < christmas.subtract(1, 'd')) {
        // the first Sunday of Advent is the first day of the liturgical year
        // advent: adventSunday to 12-23
        dayName = 'advent-' + theday.day();
    }
    else {
        // christmas
        dayName = 'day' + theday.format('MM-DD');
    }

    dailyPsalms.morningPsalms.push(DailyPsalms[dayName].morningPsalm);
    dailyPsalms.eveningPsalms = DailyPsalms[dayName].eveningPsalm;
    return {
        date,
        dailyPsalms
    };
};

module.exports = internals;
