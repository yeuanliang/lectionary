'use strict';

const Hapi = require('hapi');
const Vision = require('vision')
const Pug = require('pug')
const DailyReadings = require('./lib/dailyreading')
const internals = {
    templatePath: '.'
};
const today = new Date();
internals.thisYear = today.getFullYear();

const rootHandler = (request, h) => {
    const scripts = DailyReadings(today)
    return h.view('index', {
        title: '今日经文',
        scripts:scripts,
        year: internals.thisYear
    });
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

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

internals.main();