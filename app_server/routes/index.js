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

                const today = new Date();
                const thisYear = today.getFullYear();
                let scripts = {};
                let url = 'http://localhost:3000/api/holyscripts/daily-lectionary';
                if (request.query.date){
                    url = url + '?date=' + request.query.date;
                }

                const { res, payload } = await Wreck.get(url);
                scripts = JSON.parse(payload.toString());
                return h.view('daily-lectionary', {
                    scripts,
                    year: thisYear
                });
            }
        }
    },
    {
        method:'GET',
        path:'/daily-psalms',
        options:{
            handler : async (request, h) => {

                const today = new Date();
                const thisYear = today.getFullYear();
                let scripts = {};
                let url = 'http://localhost:3000/api/holyscripts/daily-psalms';
                if (request.query.date){
                    url = url + '?date=' + request.query.date;
                }

                const { res, payload } = await Wreck.get(url);
                scripts = JSON.parse(payload.toString());
                return h.view('daily-psalms', {
                    year: thisYear,
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

                const today = new Date();
                const thisYear = today.getFullYear();
                let scripts = {};
                let url = 'http://localhost:3000/api/holyscripts/sunday-lectionary';
                const series = request.query.series;
                if (request.query.date){
                    url = url + '?series=' + series + '&date=' + request.query.date;
                }
                else {
                    url = url + '?series=' + series;
                }

                const { res, payload } = await Wreck.get(url);
                scripts = JSON.parse(payload.toString());
                return h.view('sunday-lectionary', {
                    year: thisYear,
                    scripts
                });
            }
        }
    },
    {
        method:'GET',
        path:'/sunday-lectionary/{festival}',
        options:{
            handler : async (request, h) => {

                const today = new Date();
                const thisYear = today.getFullYear();
                let scripts = {};
                let url = 'http://localhost:3000/api/holyscripts/sunday-lectionary/';
                const festival = request.params.festival;
                url = url + festival;

                const { res, payload } = await Wreck.get(url);
                scripts = JSON.parse(payload.toString());
                return h.view('sunday-lectionary', {
                    year: thisYear,
                    scripts
                });
            }
        }
    },
    {
        method:'GET',
        path:'/sunday-propers',
        options:{
            handler : async (request, h) => {

                const today = new Date();
                const thisYear = today.getFullYear();
                let propers = {};
                let url = 'http://localhost:3000/api/propers/sunday-propers';
                const series = request.query.series;
                if (request.query.date){
                    url = url + '?series=' + series + '&date=' + request.query.date;
                }
                else {
                    url = url + '?series=' + series;
                }

                const { res, payload } = await Wreck.get(url);
                propers = JSON.parse(payload.toString());
                return h.view('sunday-propers', {
                    year: thisYear,
                    propers
                });
            }
        }
    },
    {
        method:'GET',
        path:'/sunday-propers/{festival}',
        options:{
            handler : async (request, h) => {

                const today = new Date();
                const thisYear = today.getFullYear();
                let propers = {};
                let url = 'http://localhost:3000/api/propers/sunday-propers/';
                const festival = request.params.festival;
                url = url + festival;

                const { res, payload } = await Wreck.get(url);
                propers = JSON.parse(payload.toString());
                return h.view('sunday-propers', {
                    year: thisYear,
                    propers
                });
            }
        }
    },
    {
        method:'GET',
        path:'/books',
        options:{
            handler : (request, h) => {
                // 返回中文和英文书卷名
                const today = new Date();
                const thisYear = today.getFullYear();
                return h.view('booklist', {
                    year: thisYear,
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
                const url = 'http://localhost:3000/api/holyscripts/memory-verses';
                const { res, payload } = await Wreck.get(url + '?book=' + book);
                scripts = JSON.parse(payload.toString());
                return h.view('memory-verses', {
                    scripts
                });
            }
        }
    },
    {
        method:'GET',
        path:'/proper-prefaces',
        options:{
            handler : async (request, h) => {

                let prefaces = {};
                const url = 'http://localhost:3000/api/propers/proper-prefaces';
                const { res, payload } = await Wreck.get(url);
                prefaces = JSON.parse(payload.toString());
                return h.view('proper-prefaces', {
                    prefaces
                });
            }
        }
    }
];

module.exports = internals;
