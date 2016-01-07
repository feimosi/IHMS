'use strict';

var floorsPolicy = require('../policies/floors.server.policy'),
    floors = require('../controllers/floors.server.controller');

module.exports = function (app) {
    app.route('/api/floors').all(floorsPolicy.isAllowed)
        .get(floors.list)
        .post(floors.create);

    app.route('/api/floors/:floorId').all(floorsPolicy.isAllowed)
        .get(floors.read)
        .put(floors.update)
        .delete(floors.delete);

    app.param('floorId', floors.floorByID);
};
