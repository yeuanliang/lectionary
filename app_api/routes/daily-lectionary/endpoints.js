'use strict';

const DailyLectionaryHandler = require('./handlers');
const Joi = require('joi');

const internals = {};

internals.endpoints = [
    {
        method: 'GET',
        path: '/api/holyscripts/daily-lectionary',
        options: {
            handler: DailyLectionaryHandler.getDailyLectionary,
            tags: ['api'],
            description: 'Get Daily Lectionary',
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
