'use strict';

var roomsPolicy = require('../policies/room-feature-types.server.policy'),
    roomFeatureTypes = require('../controllers/room-feature-types.server.controller');

module.exports = function (app) {
    app.route('/api/room-feature-types').all(roomsPolicy.isAllowed)
        .get(roomFeatureTypes.list)
        .post(roomFeatureTypes.create);

    app.route('/api/room-feature-types/:featureTypeId').all(roomsPolicy.isAllowed)
        .get(roomFeatureTypes.read);

    app.param('featureTypeId', roomFeatureTypes.featureTypeById);
};
