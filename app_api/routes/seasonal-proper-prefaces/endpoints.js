'use strict';

const ProperPrefacesHandler = require('./handlers');

const internals = {};

internals.endpoints = [
    {
        method: 'GET',
        path: '/api/propers/proper-prefaces',
        handler: ProperPrefacesHandler.getProperPrefaces,
        config: {
            tags: ['api'],
            description: 'Get Seasonal Proper Prefaces',
            validate: {
                query: false,
                payload: false
            }
        }
    }
];

module.exports = internals;
