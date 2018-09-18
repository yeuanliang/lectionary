const adventJS = require('advent-js')
const moment = require('moment')
const dailyLectionary = require('./daily-lectionary.js')
const dailyPsalms = require('./daily-psalms.js')
const dailyMorningPsalm = require('./daily-morning-psalm.js')
const movableDays = require('./config').daysMovable

const dailyReadings = function (date) {
    const theday = moment(date)
    const theYear = theday.format('YYYY')
    const epiphany = moment(theYear + '-01-06')
    const adventSunday = adventJS.adventSunday(theYear)
    const christmas = adventJS.christmas(theYear)
    const ashWednesday = adventJS.ashWednesday(theYear)
    const easter = adventJS.easter(theYear)
    const pentecost = adventJS.pentecost(theYear)
    const holyTrinity = pentecost.add(7, 'd')

    const generalDay = function (generalName, momentObject) {
        let startDay = 0
        let offset = 0
        let totalWeeks = 0
        let weekNumber = 0
        if (generalName === 'firstGeneral') {
            startDay = epiphany.day() + 1
            offset = momentObject.diff(epiphany, 'days')
            totalWeeks = ~~((startDay + offset) / 7)
        } else if (generalName === 'secondGeneral') {
            startDay = 1
            offset = momentObject.diff(pentecost, 'days')
            totalWeeks = ~~((startDay + offset) / 7)
        }
        weekNumber = totalWeeks % 4 + 1
        return 'general' + weekNumber + '-' + momentObject.day()
    }

    let dailyReadings = {
        morningPsalms: [],
        dailyScripts: {},
        eveningPsalms: []
    }

    // 每日经文
    let dateName = ''
    if (theday >= adventSunday && theday <= holyTrinity) {
        let index = theday.diff(ashWednesday, 'days')
        dateName = movableDays[index]
    } else {
        dateName = 'day' + theday.format('MM-DD')
    }
    dailyReadings.dailyScripts = dailyLectionary[dateName]
    // 诗145-150
    dailyReadings.morningPsalms.push(dailyMorningPsalm[theday.day()])
    // 晨祷晚祷诗篇
    // movableDays: AshWednesday to HolyTrinity (7 days after Pentecost)
    // GeneralTime四周一个周期
    let dayName = ''
    if (theday <= epiphany) {
        dayName = 'day' + theday.format('MM-DD')
    } else if (theday > epiphany && theday < ashWednesday) {
        // firstGeneral,  01-07 to the day before Ash Wednesday
        dayName = generalDay('firstGeneral', theday)
    } else if (theday >= ashWednesday && theday < easter) {
        // lent: Ash Wednesday to the day before easter
        dayName = 'lent-' + theday.day()
    } else if (theday >= easter && theday <= pentecost) {
        // easter: fifty days in length (from Easter Sunday up to and inclusive of Pentecost)
        dayName = 'advent-' + theday.day()
    } else if (theday > pentecost && theday < adventSunday) {
        // secondGeneral, the day after Penteost to the end of the liturgical year
        dayName = generalDay('secondGeneral', theday)
    } else if (theday > adventSunday && theday < christmas.subtract(1, 'd')) {
        // the first Sunday of Advent is the first day of the liturgical year
        // advent: adventSunday to 12-23
        dayName = 'advent-' + theday.day()
    } else {
        // christmas
        dayName = 'day' + theday.format('MM-DD')
    }
    dailyReadings.morningPsalms.push(dailyPsalms[dayName].morningPsalm)
    dailyReadings.eveningPsalms = dailyPsalms[dayName].eveningPsalm
    return dailyReadings
}

module.exports = dailyReadings