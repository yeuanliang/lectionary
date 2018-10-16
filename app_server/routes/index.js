'use strict';

const Wreck = require('wreck');
const BookName = require('../../app_api/data/reference.js').bibleBooks;

const internals = {};

internals.routes = [
    {
        method:'GET',
        path:'/',
        options:{
            handler : (request, h) => {

                const today = new Date();
                const thisYear = today.getFullYear();
                return h.view('index', {
                    title: '路德教会经文选',
                    year: thisYear
                });
            }
        }
    },
    {
        method:'GET',
        path:'/daily-lectionary',
        options:{
            handler : async (request, h) => {

                let scripts = {};
                const url = 'http://localhost:3000/api/holyscripts/daily-lectionary';
                const { res, payload } = await Wreck.get(url);
                scripts = JSON.parse(payload.toString());
                return h.view('daily-lectionary', {
                    title: '今日经文',
                    scripts
                });
            }
        }
    },
    {
        method:'GET',
        path:'/sunday-lectionary',
        options:{
            handler : async (request, h) => {

                let scripts = {};
                const series = request.query.series;
                const url = 'http://localhost:3000/api/holyscripts/sunday-lectionary';
                const { res, payload } = await Wreck.get(url + '?series=' + series);
                scripts = JSON.parse(payload.toString());
                return h.view('sunday-lectionary', {
                    title: '主日经文',
                    scripts
                });
            }
        }
    },
    {
        method:'GET',
        path:'/bookname',
        options:{
            handler : (request, h) => {
                // 返回中文和英文书卷名
                return h.view('memory-verses', {
                    en: BookName.en,
                    zh: BookName.zh
                });
            }
        }
    },
    {
        method:'GET',
        path:'/memory-verses',
        options:{
            handler : async (request, h) => {

                let scripts = {};
                const book = request.query.book;
                const url = 'http://localhost:3000/api/holyscripts/sunday-lectionary';
                const { res, payload } = await Wreck.get(url + '?book=' + book);
                scripts = JSON.parse(payload.toString());
                return h.view('sunday-lectionary', {
                    scripts
                });
            }
        }
    }
];

module.exports = internals;
