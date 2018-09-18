'use strict';

const Hapi = require('hapi');
const Vision = require('vision')
const Pug = require('pug')
const DailyReadings = require('./lib/dailyreading')

const internals = {
    templatePath: '.'
};

const rootHandler = (request, h) => {
    const today = new Date();
    const thisYear = today.getFullYear();
    const scripts = DailyReadings(today)
    return h.view('index', {
        title: '今日经文',
        scripts:scripts,
        year: thisYear
    });
};

const apiHandler = (request, h) => {
    const today = new Date();
    const scripts = DailyReadings(today)
    return scripts
};

internals.main = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    await server.register(Vision);
    server.views({
        engines: { pug: Pug },
        relativeTo: __dirname,
        path: `view/${internals.templatePath}`
    });

    server.route({ method: 'GET', path: '/', handler: rootHandler });
    server.route({ method: 'GET', path: '/api', handler: apiHandler });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

internals.main();