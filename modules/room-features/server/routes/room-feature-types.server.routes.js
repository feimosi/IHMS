'use strict';

var roomsPolicy = require('../policies/room-feature-types.server.policy'),
    roomFeatureTypes = require('../controllers/room-feature-types.server.controller');

module.exports = function (app) {
    app.route('/api/room-feature-types').all(roomsPolicy.isAllowed)
        .get(roomFeatureTypes.list)
        .post(roomFeatureTypes.create);
};
