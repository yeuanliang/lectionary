'use strict';

const Daily = require('../data/daily-lectionary');
const Sunday = require('../data/sunday-lectionary');
const Reference = require('../data/reference');
const Fs = require('fs');

const abbr = function (ref) {

    const bookName = Reference.bibleBooks;
    const firstDigit = ref.match(/\d/);
    const indexed = ref.indexOf(firstDigit);
    const zhName = ref.substr(0,indexed);
    const bibleIndex = bookName.zh.indexOf(zhName);
    const newRef = bookName.zhAbbr[bibleIndex] + ref.substr(indexed);
    return newRef;
};

const days = Object.keys(Daily);
for (const day of days) {
    console.log(day);
    const line = '| ' + day + ' | ' + abbr(Daily[day].firstReading.title) + ' | ' + abbr(Daily[day].secondReading.title) + '\n';
    Fs.appendFile('daily.md', line, (err) => {

        if (err){
            console.log(err);
        }
    });
}

const series = Object.keys(Sunday);
for (const s of series) {
    const Sundays = Object.keys(Sunday[s]);
    for (const sunday of Sundays){
        // console.log(sunday);
        const readings = Object.keys(Sunday[s][sunday]);
        let line = '';
        for (const reading of readings) {
            const ref = Sunday[s][sunday][reading].title;
            line += abbr(ref) + '|';
        }

        Fs.appendFile( s + '.md', '|' + sunday + '|' + line + '\n' , (err) => {

            if (err){
                console.log(err);
            }
        });
    }
}
