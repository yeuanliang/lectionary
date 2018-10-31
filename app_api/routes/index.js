'use strict';

const DailyLectionaryRoutes = require('./daily-lectionary/endpoints');
const SundayLectionaryRoutes = require('./sunday-lectionary/endpoints');
const DailyPsalmsRoutes = require('./daily-psalms/endpoints');
const MemoryVersesRoutes = require('./memory-verses/endpoints');
const SundayCollectsRoutes = require('./sunday-collects/endpoints');
const ProperPrefacesRoutes = require('./seasonal-proper-prefaces/endpoints');

const internals = {};

internals.routes = [].concat(
    DailyLectionaryRoutes.endpoints,
    SundayLectionaryRoutes.endpoints,
    DailyPsalmsRoutes.endpoints,
    MemoryVersesRoutes.endpoints,
    SundayCollectsRoutes.endpoints,
    ProperPrefacesRoutes.endpoints
);

module.exports = internals;
