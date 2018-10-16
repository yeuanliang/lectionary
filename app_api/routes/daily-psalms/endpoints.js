'use strict';

const DailyPsalmsHandler = require('./handlers');
const Joi = require('joi');

const internals = {};

internals.endpoints = [
    {
        method: 'GET',
        path: '/api/holyscripts/daily-psalms',
        options: {
            handler: DailyPsalmsHandler.getDailyPsalms,
            tags: ['api'],
            description: 'Get Daily Psalms',
            validate: {
                query: Joi.object({
                    date: Joi.string().regex(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
                }).optional(),
                payload: false
            }
        }
    }
];

module.exports = internals;
