'use strict';

const FestivalCollectsHandler = require('./handlers');

const internals = {};

internals.endpoints = [
    {
        method: 'GET',
        path: '/api/propers/festival-collects',
        handler: FestivalCollectsHandler.getFestivalCollect,
        config: {
            tags: ['api'],
            description: 'Get Festival Collect',
            validate: {
                query: false,
                payload: false
            }
        }
    }
];

module.exports = internals;
