'use strict';

const MemoryVersesHandler = require('./handlers');
const BibleBooks = require('../../data/reference.js').bibleBooks.en;
const Joi = require('joi');

const internals = {};

internals.endpoints = [
    {
        method: 'GET',
        path: '/api/holyscripts/memory-verses',
        handler: MemoryVersesHandler.getMemoryVerses,
        config: {
            tags: ['api'],
            description: 'Get Memory Verses',
            validate: {
                query: Joi.object({
                    book: Joi.string().valid(BibleBooks).required()
                }).required(),
                payload: false
            }
        }
    }
];

module.exports = internals;
