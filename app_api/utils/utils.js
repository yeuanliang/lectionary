'use strict';

const AdventJS = require('advent-js');
const SundaysBeforeHolyTrinity = require('../data/reference.js').sundaysBeforeHolyTrinity;
const SundaysAfterHolyTrinity = require('../data/reference.js').sundaysAfterHolyTrinity;
const Moment = require('moment');

const formatNumber = (n) => {

    n = n.toString();
    return n[1] ? n : '0' + n;
};

const getToday = function (){

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return [year, month, day].map(formatNumber).join('-');
};

const startYear = function (date) {
    // date format is 'YYYY-MM-DD'
    const year = date.substring(0,4);
    if (Moment(date) >= AdventJS.adventSunday(year)){
        return parseInt(year);
    }

    return parseInt(year) - 1;
};

const yearSeries = function (beginYear) {
    // 2017-2018 --> B
    // 判断一个字符串是否为日期
    const seriesNumber = beginYear % 3;
    // 0:A, 1:B, 2:C
    switch (seriesNumber) {
        case 0:
            return 'a';
        case 1:
            return 'b';
        case 2:
            return 'c';
    }
};

const sundaysOfOneYearSeries = function (beginYear) {
    // 圣诞节前：4个主日；
    // 变化部分1：第5个主日至AshWednesday；
    // 预苦期第一主日至圣三一主日：16个主日；
    // 变化部分2:至最后一天
    // January 1: Circumcision and Name of Jesus
    // 2013-2014 4+2+5+9+8+24=52;
    // 2014-2015 4+2+3+9+8+26=52;
    // 2015-2016 4+2+2+9+8+27=52;
    // 2016-2017 4+2+5+9+8+25=53 Christmas is Sunday;
    // 2017-2018 4+1+3+9+8+27=52 Christmas is Monday;
    // 2018-2019 4+2+5+9+8+24=52;
    const churchYearSundays = [];
    const christmas = AdventJS.christmas(beginYear);
    const epiphany = Moment((beginYear + 1) + '-01-06');
    const easter = AdventJS.easter(beginYear + 1);
    const nextAdventSunday = AdventJS.adventSunday(beginYear + 1);
    let firstNormalWeeks = 0;
    if (epiphany.day() === 0) {
        firstNormalWeeks = ~~(easter.diff(epiphany, 'days') / 7) - 11;
    }
    else {
        firstNormalWeeks = ~~(easter.diff(epiphany, 'days') / 7) - 10;
    }

    const secondNormalWeeks = nextAdventSunday.diff(easter, 'days') / 7 - 8;

    for (let i = 1; i <= 4; ++i) {
        churchYearSundays.push('advent' + i);
    }

    if (christmas.day() === 0) {
        churchYearSundays.push('christmas');
        churchYearSundays.push('christmas1');
    }
    else if (christmas.day() === 1) {
        churchYearSundays.push('christmas1');
    }
    else if (christmas.day() === 2) {
        churchYearSundays.push('christmas1');
        churchYearSundays.push('epiphany');
    }
    else {
        churchYearSundays.push('christmas1');
        churchYearSundays.push('christmas2');
    }

    for (let i = 1; i <= firstNormalWeeks; ++i) {
        churchYearSundays.push('epiphany' + i);
    }

    churchYearSundays.push('transfiguration', 'septuagesima', 'sexagesima', 'quinquagesima');
    for (let i = 1; i <= 5; ++i) {
        churchYearSundays.push('lent' + i);
    }

    churchYearSundays.push('palm');
    churchYearSundays.push('easter');
    for (let i = 2; i <= 7; ++i) {
        churchYearSundays.push('easter' + i);
    }

    churchYearSundays.push('pentecost', 'holyTrinity');
    for (let i = 1; i <= secondNormalWeeks - 2; ++i) {
        churchYearSundays.push('holyTrinity' + i);
    }

    churchYearSundays.push('lastSunday');
    return churchYearSundays;
};

const sundaysNameOfOneYearSeries = function (beginYear){

    const sundaysOfTheYear = sundaysOfOneYearSeries(beginYear);
    const sundaysName = [];
    const holyTrinityIndex = sundaysOfTheYear.indexOf('holyTrinity');
    for (let i = 0; i <= holyTrinityIndex; ++i){
        sundaysName.push(SundaysBeforeHolyTrinity[sundaysOfTheYear[i]]);
    }

    let j = 0;
    while (sundaysName.length < sundaysOfTheYear.length - 1){
        sundaysName.push(SundaysAfterHolyTrinity.oneYear[j]);
        ++j;
    }

    sundaysName.push('Last Sunday of Church Year');
    return sundaysName;
};

const sundaysInfoOfOneYearSeries = function (beginYear){

    const sundaysOfTheYear = sundaysOfOneYearSeries(beginYear);
    const sundaysNameOfTheYear = sundaysNameOfOneYearSeries(beginYear);
    const sundaysInfoOfTheYear = [];
    const adventSunday = AdventJS.adventSunday(beginYear);
    const nextAdventSunday = AdventJS.adventSunday(beginYear + 1);
    let sundayTime = adventSunday;
    let i = 0;
    while (sundayTime < nextAdventSunday){
        sundaysInfoOfTheYear.push({
            sign: sundaysOfTheYear[i],
            date: sundayTime.format('YYYY-MM-DD'),
            sundayName: sundaysNameOfTheYear[i]
        });
        ++i;
        sundayTime = sundayTime.add(7,'days');
    }

    return sundaysInfoOfTheYear;
};

const sundaysOfThreeYearSeries = function (beginYear) {

    const churchYearSundays = [];
    const christmas = AdventJS.christmas(beginYear);
    const epiphany = Moment((beginYear + 1) + '-01-06');
    const easter = AdventJS.easter(beginYear + 1);
    const nextAdventSunday = AdventJS.adventSunday(beginYear + 1);
    let firstNormalWeeks = 0;
    if (epiphany.day() === 0) {
        firstNormalWeeks = ~~(easter.diff(epiphany, 'days') / 7) - 8;
    }
    else {
        firstNormalWeeks = ~~(easter.diff(epiphany, 'days') / 7) - 7;
    }

    const secondNormalWeeks = nextAdventSunday.diff(easter, 'days') / 7 - 8;

    for (let i = 1; i <= 4; ++i) {
        churchYearSundays.push('advent' + i);
    }

    if (christmas.day() === 0) {
        churchYearSundays.push('christmas');
        churchYearSundays.push('christmas1');
    }
    else if (christmas.day() === 1) {
        churchYearSundays.push('christmas1');
    }
    else if (christmas.day() === 2) {
        churchYearSundays.push('christmas1');
        churchYearSundays.push('epiphany');
    }
    else {
        churchYearSundays.push('christmas1');
        churchYearSundays.push('christmas2');
    }

    churchYearSundays.push('baptism');
    for (let i = 2; i <= firstNormalWeeks; ++i) {
        churchYearSundays.push('epiphany' + i);
    }

    churchYearSundays.push('transfiguration');
    for (let i = 1; i <= 5; ++i) {
        churchYearSundays.push('lent' + i);
    }

    churchYearSundays.push('palm');
    churchYearSundays.push('easter');
    for (let i = 2; i <= 7; ++i) {
        churchYearSundays.push('easter' + i);
    }

    churchYearSundays.push('pentecost', 'holyTrinity');
    for (let i = 29 - secondNormalWeeks + 2; i <= 29; ++i) {
        churchYearSundays.push('proper' + i);
    }

    return churchYearSundays;
};

const sundaysNameOfThreeYearSeries = function (beginYear){

    const sundaysOfTheYear = sundaysOfThreeYearSeries(beginYear);
    const sundaysName = [];
    const holyTrinityIndex = sundaysOfTheYear.indexOf('holyTrinity');
    for (let i = 0; i <= holyTrinityIndex; ++i){
        sundaysName.push(SundaysBeforeHolyTrinity[sundaysOfTheYear[i]]);
    }

    let j = 0;
    while (sundaysName.length < sundaysOfTheYear.length - 1){
        sundaysName.push(SundaysAfterHolyTrinity.threeYear[j]);
        ++j;
    }

    sundaysName.push('Last Sunday of Church Year');
    return sundaysName;
};

const sundaysInfoOfThreeYearSeries = function (beginYear){

    const sundaysOfTheYear = sundaysOfThreeYearSeries(beginYear);
    const sundaysNameOfTheYear = sundaysNameOfThreeYearSeries(beginYear);
    const sundaysInfoOfTheYear = [];
    const adventSunday = AdventJS.adventSunday(beginYear);
    const nextAdventSunday = AdventJS.adventSunday(beginYear + 1);
    let sundayTime = adventSunday;
    let i = 0;
    while (sundayTime < nextAdventSunday){
        sundaysInfoOfTheYear.push({
            sign: sundaysOfTheYear[i],
            date: sundayTime.format('YYYY-MM-DD'),
            sundayName: sundaysNameOfTheYear[i]
        });
        ++i;
        sundayTime = sundayTime.add(7,'days');
    }

    return sundaysInfoOfTheYear;
};

module.exports.getToday = getToday;

module.exports.startYear = startYear;

module.exports.yearSeries = yearSeries;

module.exports.sundaysOfOneYearSeries = sundaysOfOneYearSeries;

module.exports.sundaysInfoOfOneYearSeries = sundaysInfoOfOneYearSeries;

module.exports.sundaysOfThreeYearSeries = sundaysOfThreeYearSeries;

module.exports.sundaysInfoOfThreeYearSeries = sundaysInfoOfThreeYearSeries;
