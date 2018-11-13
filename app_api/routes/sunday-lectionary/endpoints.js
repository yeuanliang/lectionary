'use strict';

const SundayLectionaryHandler = require('./handlers');
const FestivalsInfo = require('../../data/reference.js').festivalsInfo;
const Joi = require('joi');

const internals = {};

internals.endpoints = [
    {
        method: 'GET',
        path: '/api/holyscripts/sunday-lectionary',
        options: {
            handler: SundayLectionaryHandler.getSundayLectionary,
            tags: ['api'],
            description: 'Get Sunday Lectionary',
            validate: {
                query: Joi.object({
                    series: Joi.string().valid('one-year','three-year').required(),
                    date:Joi.string().regex(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/).optional()
                }).required(),
                payload: false
            }
        }
    },
    {
        method: 'GET',
        path: '/api/holyscripts/sunday-lectionary/{festival}',
        options: {
            handler: SundayLectionaryHandler.getFestivalLectionary,
            tags: ['api'],
            description: 'Get Festival Lectionary',
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
