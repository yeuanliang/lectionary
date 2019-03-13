'use strict';

const SundayProperHandler = require('./handlers');
const FestivalsInfo = require('../../data/reference.js').festivalsInfo;
const Joi = require('joi');

const internals = {};

internals.endpoints = [
    {
        method: 'GET',
        path: '/api/propers/sunday-propers',
        options: {
            handler: SundayProperHandler.getSundayPropers,
            tags: ['api'],
            description: 'Get Sunday Propers',
            validate: {
                query: Joi.object({
                    series: Joi.string().valid('one-year','three-year','special').required(),
                    date:Joi.string().regex(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/).optional()
                }).required(),
                payload: false
            }
        }
    },
    {
        method: 'GET',
        path: '/api/propers/sunday-propers/{festival}',
        options: {
            handler: SundayProperHandler.getFestivalPropers,
            tags: ['api'],
            description: 'Get Festival Propers',
            validate: {
                params: Joi.object({
                    festival: Joi.string().valid(Object.keys(FestivalsInfo)).required()
                }).required(),
                payload: false
            }
        }
    }
];

module.exports = internals;
