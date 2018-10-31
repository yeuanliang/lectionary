'use strict';

const SundayCollectsHandler = require('./handlers');

const internals = {};

internals.endpoints = [
    {
        method: 'GET',
        path: '/api/propers/sunday-collects',
        handler: SundayCollectsHandler.getSundayCollect,
        config: {
            tags: ['api'],
            description: 'Get Sunday Collect',
            validate: {
                query: false,
                payload: false
            }
        }
    }
];

module.exports = internals;
